// Central Registry for GESP Exam Papers
// Aligned with actual historical sessions:
// 2023.03: Level 1
// 2023.06: Level 1, 2
// 2023.09: Level 1-6
// 2023.12 - 2025.12: Level 1-8

// ========== 一级 (Level 1) ==========
import { paperData as p202303 } from './level1/2023-03-l1';
import { paperData as p202306 } from './level1/2023-06-l1';
import { paperData as p202309 } from './level1/2023-09-l1';
import { paperData as p202312 } from './level1/2023-12-l1';
import { paperData as p202403 } from './level1/2024-03-l1';
import { paperData as p202406 } from './level1/2024-06-l1';
import { paperData as p202409 } from './level1/2024-09-l1';
import { paperData as p202412 } from './level1/2024-12-l1';
import { paperData as p202503 } from './level1/2025-03-l1';
import { paperData as p202506 } from './level1/2025-06-l1';
import { paperData as p202509 } from './level1/2025-09-l1';
import { paperData as p202512 } from './level1/2025-12-l1';

// ========== 二级 (Level 2) ==========
// 2023-03 had no Level 2
import { paperData as p202306l2 } from './level2/2023-06-l2';
import { paperData as p202309l2 } from './level2/2023-09-l2';
import { paperData as p202312l2 } from './level2/2023-12-l2';
import { paperData as p202403l2 } from './level2/2024-03-l2';
import { paperData as p202406l2 } from './level2/2024-06-l2';
import { paperData as p202409l2 } from './level2/2024-09-l2';
import { paperData as p202412l2 } from './level2/2024-12-l2';
import { paperData as p202503l2 } from './level2/2025-03-l2';
import { paperData as p202506l2 } from './level2/2025-06-l2';
import { paperData as p202509l2 } from './level2/2025-09-l2';
import { paperData as p202512l2 } from './level2/2025-12-l2';

// ========== 三级 (Level 3) ==========
// 2023-03 and 2023-06 had no Level 3
import { paperData as p202309l3 } from './level3/2023-09-l3';
import { paperData as p202312l3 } from './level3/2023-12-l3';
import { paperData as p202403l3 } from './level3/2024-03-l3';
import { paperData as p202406l3 } from './level3/2024-06-l3';
import { paperData as p202409l3 } from './level3/2024-09-l3';
import { paperData as p202412l3 } from './level3/2024-12-l3';
import { paperData as p202503l3 } from './level3/2025-03-l3';
import { paperData as p202506l3 } from './level3/2025-06-l3';
import { paperData as p202509l3 } from './level3/2025-09-l3';
import { paperData as p202512l3 } from './level3/2025-12-l3';

// ========== 四级 (Level 4) ==========
// 2023-03 had no Level 4
import { paperData as p202306l4 } from './level4/2023-06-l4';
import { paperData as p202309l4 } from './level4/2023-09-l4';
import { paperData as p202312l4 } from './level4/2023-12-l4';
import { paperData as p202403l4 } from './level4/2024-03-l4';
import { paperData as p202406l4 } from './level4/2024-06-l4';
import { paperData as p202409l4 } from './level4/2024-09-l4';
import { paperData as p202412l4 } from './level4/2024-12-l4';
import { paperData as p202503l4 } from './level4/2025-03-l4';
import { paperData as p202506l4 } from './level4/2025-06-l4';
import { paperData as p202509l4 } from './level4/2025-09-l4';
import { paperData as p202512l4 } from './level4/2025-12-l4';
import { paperData as p202603l4 } from './level4/2026-03-l4';

// ========== 五级 (Level 5) ==========
// 2023-03 and 2023-06 had no Level 5
import { paperData as p202309l5 } from './level5/2023-09-l5';
import { paperData as p202312l5 } from './level5/2023-12-l5';
import { paperData as p202403l5 } from './level5/2024-03-l5';
import { paperData as p202406l5 } from './level5/2024-06-l5';
import { paperData as p202409l5 } from './level5/2024-09-l5';
import { paperData as p202412l5 } from './level5/2024-12-l5';
import { paperData as p202503l5 } from './level5/2025-03-l5';
import { paperData as p202506l5 } from './level5/2025-06-l5';
import { paperData as p202509l5 } from './level5/2025-09-l5';
import { paperData as p202512l5 } from './level5/2025-12-l5';

// ========== 六级 (Level 6) ==========
// 2023-03 and 2023-06 had no Level 6
import { paperData as p202309l6 } from './level6/2023-09-l6';
import { paperData as p202312l6 } from './level6/2023-12-l6';
import { paperData as p202403l6 } from './level6/2024-03-l6';
import { paperData as p202406l6 } from './level6/2024-06-l6';
import { paperData as p202409l6 } from './level6/2024-09-l6';
import { paperData as p202412l6 } from './level6/2024-12-l6';
import { paperData as p202503l6 } from './level6/2025-03-l6';
import { paperData as p202506l6 } from './level6/2025-06-l6';
import { paperData as p202509l6 } from './level6/2025-09-l6';
import { paperData as p202512l6 } from './level6/2025-12-l6';

// ========== 七级 (Level 7) ==========
// 2023-03, 06, 09 had no Level 7
import { paperData as p202312l7 } from './level7/2023-12-l7';
import { paperData as p202403l7 } from './level7/2024-03-l7';
import { paperData as p202406l7 } from './level7/2024-06-l7';
import { paperData as p202409l7 } from './level7/2024-09-l7';
import { paperData as p202412l7 } from './level7/2024-12-l7';
import { paperData as p202503l7 } from './level7/2025-03-l7';
import { paperData as p202506l7 } from './level7/2025-06-l7';
import { paperData as p202509l7 } from './level7/2025-09-l7';
import { paperData as p202512l7 } from './level7/2025-12-l7';

// ========== 八级 (Level 8) ==========
// 2023-03, 06, 09 had no Level 8
import { paperData as p202312l8 } from './level8/2023-12-l8';
import { paperData as p202403l8 } from './level8/2024-03-l8';
import { paperData as p202406l8 } from './level8/2024-06-l8';
import { paperData as p202409l8 } from './level8/2024-09-l8';
import { paperData as p202412l8 } from './level8/2024-12-l8';
import { paperData as p202503l8 } from './level8/2025-03-l8';
import { paperData as p202506l8 } from './level8/2025-06-l8';
import { paperData as p202509l8 } from './level8/2025-09-l8';
import { paperData as p202512l8 } from './level8/2025-12-l8';

export const paperRegistry = {
    // ===== 一级 =====
    '2023-03-l1': p202303, '2023-06-l1': p202306, '2023-09-l1': p202309, '2023-12-l1': p202312,
    '2024-03-l1': p202403, '2024-06-l1': p202406, '2024-09-l1': p202409, '2024-12-l1': p202412,
    '2025-03-l1': p202503, '2025-06-l1': p202506, '2025-09-l1': p202509, '2025-12-l1': p202512,
    // ===== 二级 =====
    '2023-06-l2': p202306l2, '2023-09-l2': p202309l2, '2023-12-l2': p202312l2,
    '2024-03-l2': p202403l2, '2024-06-l2': p202406l2, '2024-09-l2': p202409l2, '2024-12-l2': p202412l2,
    '2025-03-l2': p202503l2, '2025-06-l2': p202506l2, '2025-09-l2': p202509l2, '2025-12-l2': p202512l2,
    // ===== 三级 =====
    '2023-09-l3': p202309l3, '2023-12-l3': p202312l3,
    '2024-03-l3': p202403l3, '2024-06-l3': p202406l3, '2024-09-l3': p202409l3, '2024-12-l3': p202412l3,
    '2025-03-l3': p202503l3, '2025-06-l3': p202506l3, '2025-09-l3': p202509l3, '2025-12-l3': p202512l3,
    // ===== 四级 =====
    '2023-06-l4': p202306l4, '2023-09-l4': p202309l4, '2023-12-l4': p202312l4,
    '2024-03-l4': p202403l4, '2024-06-l4': p202406l4, '2024-09-l4': p202409l4, '2024-12-l4': p202412l4,
    '2025-03-l4': p202503l4, '2025-06-l4': p202506l4, '2025-09-l4': p202509l4, '2025-12-l4': p202512l4,
    '2026-03-l4': p202603l4,
    // ===== 五级 =====
    '2023-09-l5': p202309l5, '2023-12-l5': p202312l5,
    '2024-03-l5': p202403l5, '2024-06-l5': p202406l5, '2024-09-l5': p202409l5, '2024-12-l5': p202412l5,
    '2025-03-l5': p202503l5, '2025-06-l5': p202506l5, '2025-09-l5': p202509l5, '2025-12-l5': p202512l5,
    // ===== 六级 =====
    '2023-09-l6': p202309l6, '2023-12-l6': p202312l6,
    '2024-03-l6': p202403l6, '2024-06-l6': p202406l6, '2024-09-l6': p202409l6, '2024-12-l6': p202412l6,
    '2025-03-l6': p202503l6, '2025-06-l6': p202506l6, '2025-09-l6': p202509l6, '2025-12-l6': p202512l6,
    // ===== 七级 =====
    '2023-12-l7': p202312l7,
    '2024-03-l7': p202403l7, '2024-06-l7': p202406l7, '2024-09-l7': p202409l7, '2024-12-l7': p202412l7,
    '2025-03-l7': p202503l7, '2025-06-l7': p202506l7, '2025-09-l7': p202509l7, '2025-12-l7': p202512l7,
    // ===== 八级 =====
    '2023-12-l8': p202312l8,
    '2024-03-l8': p202403l8, '2024-06-l8': p202406l8, '2024-09-l8': p202409l8, '2024-12-l8': p202412l8,
    '2025-03-l8': p202503l8, '2025-06-l8': p202506l8, '2025-09-l8': p202509l8, '2025-12-l8': p202512l8,
};

export default paperRegistry;
