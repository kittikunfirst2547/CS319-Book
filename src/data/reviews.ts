import type { Review } from "../types/review";

export const reviews: Review[] = [
  {
    id: "1",
    serviceId: "1",
    userName: "สมชาย ใจดี",
    rating: 5,
    comment: "ตรวจละเอียด พยาบาลใจดี ได้ผลเร็ว",
  },
  {
    id: "2",
    serviceId: "1",
    userName: "มาลี สุขสันต์",
    rating: 4,
    comment: "บริการดี แต่รอคิวนานนิดหนึ่ง",
  },
  {
    id: "3",
    serviceId: "2",
    userName: "ปิยะ แสงทอง",
    rating: 5,
    comment: "ครูสอนเข้าใจง่าย เหมาะกับมือใหม่",
  },
  {
    id: "4",
    serviceId: "5",
    userName: "วรรณา ศรีงาม",
    rating: 5,
    comment: "ผ่อนคลายมาก นอนหลับสบายขึ้น",
  },
];
