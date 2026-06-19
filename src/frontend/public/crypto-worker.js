/**
 * crypto-worker.js — ORO NOVA Crypto Worker
 * AES-256-GCM, PBKDF2 100K iterations, SHA-256/512, HMAC, Wire Tokens
 * Uses Web Crypto API (SubtleCrypto) — available in workers
 * Canonical: PHI=1.618, HEARTBEAT_MS=873
 * Pattern: { action, payload } in → { success, data, error } out
 */

const HEARTBEAT_MS = 873;
const PBKDF2_ITERATIONS = 100000;
const AES_KEY_BITS = 256;
const IV_BYTES = 12;   // 96-bit IV for AES-GCM
const SALT_BYTES = 16;

// Session key for wire tokens — generated fresh each worker init
let sessionKey = null;

async function getSessionKey() {
  if (sessionKey) return sessionKey;
  sessionKey = await self.crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  return sessionKey;
}

// ── Encoding Utilities ────────────────────────────────────────────────────────
function bufToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBuf(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function bufToHex(buf) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ── PBKDF2 Key Derivation ─────────────────────────────────────────────────────
async function deriveKey(password, saltBuf) {
  const enc = new TextEncoder();
  const keyMaterial = await self.crypto.subtle.importKey(
    "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return self.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBuf, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: AES_KEY_BITS },
    false,
    ["encrypt", "decrypt"]
  );
}

// ── Message Handler ───────────────────────────────────────────────────────────
self.onmessage = async (e) => {
  const { action, payload } = e.data;

  try {
    switch (action) {

      case "ENCRYPT": {
        const { data, passphrase } = payload || {};
        if (!data || !passphrase) {
          self.postMessage({ success: false, action, error: "data and passphrase required" });
          return;
        }
        const saltBuf = self.crypto.getRandomValues(new Uint8Array(SALT_BYTES)).buffer;
        const ivBuf = self.crypto.getRandomValues(new Uint8Array(IV_BYTES)).buffer;
        const key = await deriveKey(passphrase, saltBuf);
        const enc = new TextEncoder();
        const cipherBuf = await self.crypto.subtle.encrypt(
          { name: "AES-GCM", iv: ivBuf },
          key,
          enc.encode(data)
        );
        self.postMessage({
          success: true, action,
          data: {
            ciphertext: bufToBase64(cipherBuf),
            iv: bufToBase64(ivBuf),
            salt: bufToBase64(saltBuf),
          },
        });
        break;
      }

      case "DECRYPT": {
        const { ciphertext, iv, salt, passphrase } = payload || {};
        if (!ciphertext || !iv || !salt || !passphrase) {
          self.postMessage({ success: false, action, error: "ciphertext, iv, salt, passphrase required" });
          return;
        }
        const saltBuf = base64ToBuf(salt);
        const ivBuf = base64ToBuf(iv);
        const key = await deriveKey(passphrase, saltBuf);
        const plainBuf = await self.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: ivBuf },
          key,
          base64ToBuf(ciphertext)
        );
        const dec = new TextDecoder();
        self.postMessage({ success: true, action, data: { plaintext: dec.decode(plainBuf) } });
        break;
      }

      case "HASH": {
        const { data, algorithm = "SHA-256" } = payload || {};
        if (!data) {
          self.postMessage({ success: false, action, error: "data required" });
          return;
        }
        if (algorithm !== "SHA-256" && algorithm !== "SHA-512") {
          self.postMessage({ success: false, action, error: "algorithm must be SHA-256 or SHA-512" });
          return;
        }
        const enc = new TextEncoder();
        const hashBuf = await self.crypto.subtle.digest(algorithm, enc.encode(String(data)));
        self.postMessage({ success: true, action, data: { hash: bufToHex(hashBuf), algorithm } });
        break;
      }

      case "PBKDF2_DERIVE": {
        const { password, salt: saltIn, iterations = PBKDF2_ITERATIONS, keyLength = AES_KEY_BITS } = payload || {};
        if (!password) {
          self.postMessage({ success: false, action, error: "password required" });
          return;
        }
        const saltBuf = saltIn ? base64ToBuf(saltIn) : self.crypto.getRandomValues(new Uint8Array(SALT_BYTES)).buffer;
        const enc = new TextEncoder();
        const keyMaterial = await self.crypto.subtle.importKey(
          "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
        );
        const derivedKey = await self.crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: saltBuf, iterations, hash: "SHA-256" },
          keyMaterial,
          { name: "AES-GCM", length: keyLength },
          true,
          ["encrypt", "decrypt"]
        );
        const exportedKey = await self.crypto.subtle.exportKey("raw", derivedKey);
        self.postMessage({
          success: true, action,
          data: { key: bufToBase64(exportedKey), salt: bufToBase64(saltBuf) },
        });
        break;
      }

      case "HMAC_SIGN": {
        const { data, key: keyB64 } = payload || {};
        if (!data || !keyB64) {
          self.postMessage({ success: false, action, error: "data and key required" });
          return;
        }
        const keyBuf = base64ToBuf(keyB64);
        const cryptoKey = await self.crypto.subtle.importKey(
          "raw", keyBuf, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
        );
        const enc = new TextEncoder();
        const sigBuf = await self.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(String(data)));
        self.postMessage({ success: true, action, data: { signature: bufToBase64(sigBuf) } });
        break;
      }

      case "HMAC_VERIFY": {
        const { data, signature, key: keyB64 } = payload || {};
        if (!data || !signature || !keyB64) {
          self.postMessage({ success: false, action, error: "data, signature, and key required" });
          return;
        }
        const keyBuf = base64ToBuf(keyB64);
        const cryptoKey = await self.crypto.subtle.importKey(
          "raw", keyBuf, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
        );
        const enc = new TextEncoder();
        const valid = await self.crypto.subtle.verify("HMAC", cryptoKey, base64ToBuf(signature), enc.encode(String(data)));
        self.postMessage({ success: true, action, data: { valid } });
        break;
      }

      case "GENERATE_WIRE_TOKEN": {
        const { wireId, expiresIn = HEARTBEAT_MS * 1000 } = payload || {};
        if (!wireId) {
          self.postMessage({ success: false, action, error: "wireId required" });
          return;
        }
        const issued = Date.now();
        const expires = issued + expiresIn;
        const nonceBuf = self.crypto.getRandomValues(new Uint8Array(8));
        const nonce = bufToHex(nonceBuf.buffer);
        const tokenPayload = JSON.stringify({ wireId, issued, expires, nonce });
        const sk = await getSessionKey();
        const enc = new TextEncoder();
        const sigBuf = await self.crypto.subtle.sign("HMAC", sk, enc.encode(tokenPayload));
        const token = `${bufToBase64(enc.encode(tokenPayload))}.${bufToBase64(sigBuf)}`;
        self.postMessage({ success: true, action, data: { token, expiresAt: expires, wireId } });
        break;
      }

      default:
        self.postMessage({ success: false, action, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    self.postMessage({ success: false, action, error: err?.message ?? String(err) });
  }
};
