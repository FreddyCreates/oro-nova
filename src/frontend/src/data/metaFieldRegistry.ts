// Re-export all types and utilities from types file
export type { MetaDimension, MetaFamily, MetaModel } from "./metaFieldTypes";
export {
  META_FAMILIES,
  DIMENSION_LABELS,
  DIMENSION_COLORS,
  getMetaByFamily,
  getMetaByDimension,
  getMetaByNNode,
  searchMeta,
  getMetaCouplings,
} from "./metaFieldTypes";

import { META_MODELS_ARCHETYPAL } from "./metaFieldModels_archetypal";
import { META_MODELS_HORIZONTAL_A } from "./metaFieldModels_horizontal_a";
import { META_MODELS_HORIZONTAL_B } from "./metaFieldModels_horizontal_b";
import { META_MODELS_SMOF_PLANES } from "./metaFieldModels_planes";
import { META_MODELS_SCALE } from "./metaFieldModels_scale";
// Import all model batches
import { META_MODELS_VERTICAL_P1 } from "./metaFieldModels_vertical_part1";
import { META_MODELS_VERTICAL_P2 } from "./metaFieldModels_vertical_part2";

// Combined registry — all 800+ metamodels
export const META_MODELS = [
  ...META_MODELS_VERTICAL_P1,
  ...META_MODELS_VERTICAL_P2,
  ...META_MODELS_SMOF_PLANES,
  ...META_MODELS_HORIZONTAL_A,
  ...META_MODELS_HORIZONTAL_B,
  ...META_MODELS_SCALE,
  ...META_MODELS_ARCHETYPAL,
];

export const TOTAL_METAMODELS: number = META_MODELS.length;

// Convenience wrappers using the combined registry
import {
  getMetaByDimension as _getMetaByDimension,
  getMetaByFamily as _getMetaByFamily,
  getMetaByNNode as _getMetaByNNode,
  getMetaCouplings as _getMetaCouplings,
  searchMeta as _searchMeta,
} from "./metaFieldTypes";
import type { MetaDimension, MetaModel } from "./metaFieldTypes";

export function getModelsByFamily(familyId: string): MetaModel[] {
  return _getMetaByFamily(META_MODELS, familyId);
}
export function getModelsByDimension(dim: MetaDimension): MetaModel[] {
  return _getMetaByDimension(META_MODELS, dim);
}
export function getModelsByNNode(nNode: string): MetaModel[] {
  return _getMetaByNNode(META_MODELS, nNode);
}
export function searchModels(query: string): MetaModel[] {
  return _searchMeta(META_MODELS, query);
}
export function getModelCouplings(id: string): MetaModel[] {
  return _getMetaCouplings(META_MODELS, id);
}

// Stats
export const REGISTRY_STATS = {
  total: META_MODELS.length,
  byDimension: {
    VERTICAL: META_MODELS.filter((m) => m.dimension === "VERTICAL").length,
    HORIZONTAL: META_MODELS.filter((m) => m.dimension === "HORIZONTAL").length,
    SCALE: META_MODELS.filter((m) => m.dimension === "SCALE").length,
    ARCHETYPAL: META_MODELS.filter((m) => m.dimension === "ARCHETYPAL").length,
  },
  families: 45,
} as const;
