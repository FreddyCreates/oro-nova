#!/usr/bin/env python3
def read_leb128(data, pos):
    val = 0; shift = 0
    while True:
        b = data[pos]; pos += 1
        val |= (b & 0x7f) << shift
        shift += 7
        if not (b & 0x80):
            return val, pos

def read_string(data, pos):
    slen, pos = read_leb128(data, pos)
    s = data[pos:pos+slen].decode('utf-8', errors='replace')
    return s, pos + slen

with open('/home/ubuntu/workspace/app/src/backend/dist/backend.wasm', 'rb') as f:
    data = f.read()

print(f"Wasm size: {len(data)} bytes")

pos = 8
section_offsets = {}
while pos < len(data) - 1:
    sec_id = data[pos]; pos += 1
    sec_len, pos = read_leb128(data, pos)
    section_offsets[sec_id] = (pos, sec_len)
    pos += sec_len

import_func_count = 0
if 2 in section_offsets:
    ipos, ilen = section_offsets[2]
    iend = ipos + ilen
    cnt, ipos = read_leb128(data, ipos)
    print(f"Total imports: {cnt}")
    for i in range(cnt):
        if ipos >= iend: break
        mod, ipos = read_string(data, ipos)
        nm, ipos = read_string(data, ipos)
        dt = data[ipos]; ipos += 1
        if dt == 0:
            type_idx, ipos = read_leb128(data, ipos)
            import_func_count += 1
        elif dt == 1:
            ipos += 1
            flags = data[ipos]; ipos += 1
            lim_min, ipos = read_leb128(data, ipos)
            if flags & 1: lim_max, ipos = read_leb128(data, ipos)
        elif dt == 2:
            flags = data[ipos]; ipos += 1
            lim_min, ipos = read_leb128(data, ipos)
            if flags & 1: lim_max, ipos = read_leb128(data, ipos)
        elif dt == 3:
            ipos += 2

print(f"Function imports total: {import_func_count}")
mod_idx = 30 - import_func_count
print(f"Function index 30 is module-defined func #{mod_idx} (0-based among module funcs)")

pos2 = 8
while pos2 < len(data) - 1:
    sec_id = data[pos2]; pos2 += 1
    sec_len, pos2 = read_leb128(data, pos2)
    sec_body_start = pos2
    if sec_id == 0:
        try:
            sec_name, name_end = read_string(data, pos2)
            if sec_name == "name":
                npos = name_end
                nend = sec_body_start + sec_len
                while npos < nend:
                    sub_id = data[npos]; npos += 1
                    sub_len, npos = read_leb128(data, npos)
                    sub_end = npos + sub_len
                    if sub_id == 1:
                        fn_cnt, npos = read_leb128(data, npos)
                        print(f"Total named functions: {fn_cnt}")
                        for _ in range(fn_cnt):
                            if npos >= sub_end: break
                            fn_idx, npos = read_leb128(data, npos)
                            fn_name, npos = read_string(data, npos)
                            if 25 <= fn_idx <= 40:
                                print(f"  func[{fn_idx}] = {fn_name}")
                        break
                    npos = sub_end
        except Exception as e:
            pass
    pos2 += sec_len
