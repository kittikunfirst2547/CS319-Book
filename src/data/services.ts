import type { Service } from "../types/service";

export const services: Service[] = [
  {
    id: "1",
    name: "แพ็กเกจตรวจสุขภาพประจำปี",
    category: "checkup",
    price: 1200,
    rating: 4.8,
    reviewCount: 128,
    provider: "คลินิกเวลเนสพลัส",
    description:
      "ตรวจเลือด ตรวจปัสสาวะ วัดความดัน และพบแพทย์สรุปผล ใช้เวลาประมาณ 2 ชั่วโมง กรุณางดอาหาร 8 ชั่วโมงก่อนตรวจ",
    imageUrl: "",
    durationMin: 120,
  },
  {
    id: "2",
    name: "คลาสโยคะเช้า (กลุ่มเล็ก)",
    category: "yoga",
    price: 350,
    rating: 4.6,
    reviewCount: 74,
    provider: "Calm Yoga Studio",
    description:
      "โยคะเบื้องต้นสำหรับผู้เริ่มต้น กลุ่มไม่เกิน 8 คน ช่วยยืดเหยียดและลดความเครียด",
    imageUrl: "",
    durationMin: 60,
  },
  {
    id: "3",
    name: "เทรนเนอร์ส่วนตัว 1 ชม.",
    category: "fitness",
    price: 600,
    rating: 4.7,
    reviewCount: 52,
    provider: "FitLab Gym",
    description:
      "ออกแบบโปรแกรมออกกำลังกายเฉพาะบุคคล พร้อมประเมินร่างกายก่อนเริ่ม",
    imageUrl: "",
    durationMin: 60,
  },
  {
    id: "4",
    name: "ปรึกษานักโภชนาการ",
    category: "nutrition",
    price: 500,
    rating: 4.5,
    reviewCount: 39,
    provider: "NutriCare",
    description:
      "วิเคราะห์พฤติกรรมการกิน และวางแผนมื้ออาหารให้เหมาะกับเป้าหมายสุขภาพ",
    imageUrl: "",
    durationMin: 45,
  },
  {
    id: "5",
    name: "สปาผ่อนคลายทั้งตัว",
    category: "spa",
    price: 900,
    rating: 4.9,
    reviewCount: 210,
    provider: "Serene Spa",
    description:
      "นวดน้ำมันอโรมาทั้งตัว ช่วยคลายกล้ามเนื้อและทำให้นอนหลับดีขึ้น",
    imageUrl: "",
    durationMin: 90,
  },
  {
    id: "6",
    name: "คลาสฟิตเนสกลุ่ม",
    category: "fitness",
    price: 250,
    rating: 4.4,
    reviewCount: 88,
    provider: "FitLab Gym",
    description:
      "คลาสคาร์ดิโอและเวทแบบกลุ่ม สนุก ได้เพื่อนใหม่ เหมาะกับทุกระดับ",
    imageUrl: "",
    durationMin: 50,
  },
];
