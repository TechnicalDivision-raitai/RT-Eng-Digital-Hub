export type SystemId = 'saraban' | 'project' | 'procurement' | 'inventory';

export type SystemStatus = 'active' | 'pending';

export interface PortalSystem {
  id: SystemId;
  indexLabel: string;
  code: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  url: string | null;
  ctaLabel: string;
  accentHex: string;
  tintHex: string;
  defaultStatus: SystemStatus;
  scopeItems: string[];
}

export const PORTAL_SYSTEMS: PortalSystem[] = [
  {
    id: 'saraban',
    indexLabel: '01',
    code: 'E-SARABAN',
    title: 'ระบบสารบรรณอิเล็กทรอนิกส์',
    shortTitle: 'ระบบสารบรรณ',
    category: 'งานสารบรรณและทะเบียนเอกสาร',
    description:
      'ระบบจัดเก็บและบริหารทะเบียนหนังสือรับ หนังสือส่ง คำสั่ง บันทึกข้อความ แบบฟอร์ม และงานฎีกาของกองช่าง',
    url: 'https://e-saraban-rt.vercel.app/',
    ctaLabel: 'เข้าสู่ระบบสารบรรณ',
    accentHex: '#1f5f8b',
    tintHex: '#eaf3fa',
    defaultStatus: 'active',
    scopeItems: ['ทะเบียนหนังสือรับ-ส่ง', 'คำสั่งและบันทึกข้อความ', 'งานฎีกาและแบบฟอร์ม'],
  },
  {
    id: 'project',
    indexLabel: '02',
    code: 'E-PROJECT',
    title: 'ระบบบริหารจัดการโครงการ',
    shortTitle: 'บริหารโครงการ',
    category: 'งานวิศวกรรมและติดตามโครงการ',
    description:
      'ระบบบริหารจัดการข้อมูลโครงการ งบประมาณ สัญญาจ้าง การตรวจรับงานจ้าง และการเบิกจ่ายงบลงทุนของกองช่าง',
    url: 'https://e-raitai.vercel.app/',
    ctaLabel: 'เข้าสู่ระบบบริหารโครงการ',
    accentHex: '#1d7250',
    tintHex: '#e9f6ef',
    defaultStatus: 'active',
    scopeItems: ['แผนและข้อมูลโครงการ', 'สัญญาจ้างและการตรวจรับ', 'ติดตามงบประมาณและเบิกจ่าย'],
  },
  {
    id: 'procurement',
    indexLabel: '03',
    code: 'E-PROCUREMENT',
    title: 'ระบบงานจัดซื้อจัดจ้าง',
    shortTitle: 'จัดซื้อจัดจ้าง',
    category: 'งานพัสดุและจัดซื้อจัดจ้าง',
    description:
      'ระบบบริหารจัดการงานจัดซื้อจัดจ้าง จัดทำแผนจัดหา ราคากลาง เอกสารประกอบการจัดจ้าง และติดตามสถานะดำเนินการ',
    url: 'https://e-purchas.vercel.app/',
    ctaLabel: 'เข้าสู่ระบบจัดซื้อจัดจ้าง',
    accentHex: '#8d5314',
    tintHex: '#fbf2e7',
    defaultStatus: 'active',
    scopeItems: ['แผนและเอกสารจัดซื้อจัดจ้าง', 'ข้อมูลราคากลางและTOR', 'ติดตามสถานะการอนุมัติ'],
  },
  {
    id: 'inventory',
    indexLabel: '04',
    code: 'E-INVENTORY',
    title: 'ระบบคุมพัสดุ',
    shortTitle: 'คุมพัสดุ',
    category: 'งานทะเบียนคุมพัสดุและครุภัณฑ์',
    description:
      'ระบบทะเบียนคุมพัสดุ ครุภัณฑ์ การเบิก-จ่ายวัสดุคงคลัง และการตรวจสอบพัสดุประจำปีของกองช่าง อบต.ไร่ใต้',
    url: 'https://e-inventory-beta.vercel.app/',
    ctaLabel: 'เข้าสู่ระบบคุมพัสดุ',
    accentHex: '#0f6b63',
    tintHex: '#e7f5f3',
    defaultStatus: 'active',
    scopeItems: ['ทะเบียนคุมครุภัณฑ์', 'รับ-จ่ายวัสดุคงคลัง', 'รายงานตรวจนับประจำปี'],
  },
];
