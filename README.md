# ศูนย์รวมระบบสารสนเทศ | กองช่าง อบต.ไร่ใต้

พอร์ทัลกลางสำหรับเชื่อมโยงระบบปฏิบัติงานดิจิทัลของ **กองช่าง องค์การบริหารส่วนตำบลไร่ใต้** อำเภอพิบูลมังสาหาร จังหวัดอุบลราชธานี

## ระบบสารสนเทศภายในพอร์ทัล

1. **ระบบสารบรรณอิเล็กทรอนิกส์ (E-SARABAN)** — `https://e-saraban-kappa.vercel.app/`
2. **ระบบบริหารจัดการโครงการ (E-PROJECT)** — `https://e-raitai.vercel.app/`
3. **ระบบงานจัดซื้อจัดจ้าง (E-PROCUREMENT)** — `https://e-purchas.vercel.app/`
4. **ระบบคุมพัสดุ (E-INVENTORY)** — *อยู่ระหว่างรออัพเดตลิงก์* (รองรับการระบุลิงก์ชั่วคราวผ่านหน้าเว็บ)

## การอัปเดตลิงก์ระบบคุมพัสดุแบบถาวร

เมื่อมี URL ของ **ระบบคุมพัสดุ** พร้อมใช้งานแล้ว ให้แก้ไขไฟล์ `src/data/systems.ts` ในรายการ `id: 'inventory'` โดยเปลี่ยนค่า `url: null` เป็นลิงก์จริง และเปลี่ยน `defaultStatus: 'active'`

```ts
{
  id: 'inventory',
  // ...
  url: 'https://your-inventory-url.vercel.app/',
  ctaLabel: 'เข้าสู่ระบบคุมพัสดุ',
  defaultStatus: 'active',
}
```

## การรันและทดสอบในเครื่อง

```bash
npm install
npm run dev
```

สำหรับตรวจสอบ TypeScript และสร้างไฟล์สำหรับเผยแพร่ (`dist/`):

```bash
npm run lint
npm run build
```

## ขั้นตอนการอัปโหลดขึ้น GitHub และเผยแพร่

### 1. อัปโหลดโค้ดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit: Raitai Engineering Portal"
git branch -M main
git remote add origin https://github.com/<username>/<repository-name>.git
git push -u origin main
```

### 2. เผยแพร่เว็บไซต์

- **วิธีที่ 1: GitHub Pages (อัตโนมัติ)**
  1. ไปที่หน้า GitHub Repository > **Settings** > **Pages**
  2. ในหัวข้อ **Build and deployment** > **Source** ให้เลือก **GitHub Actions**
  3. ทุกครั้งที่ push โค้ดขึ้น branch `main` ระบบจะรัน workflow `.github/workflows/deploy.yml` และเผยแพร่ให้อัตโนมัติ

- **วิธีที่ 2: Vercel**
  1. นำเข้า Repository จาก GitHub ใน [Vercel](https://vercel.com/)
  2. Vercel จะตรวจจับค่าจาก `vercel.json` (`npm run build` และโฟลเดอร์ `dist`) ให้อัตโนมัติ และกด **Deploy** ได้ทันที
