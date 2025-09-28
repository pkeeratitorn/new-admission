// ==================================================
// 1. กำหนดค่าเริ่มต้นและช่วงเวลา
// **************************************************

// ******* ปรับเปลี่ยนค่าเหล่านี้ตามต้องการ *******
const ADMISSION_START = '2025-12-01 08:30:00'; // ปี/เดือน/วัน เวลาเริ่มต้น
const ADMISSION_END = '2025-12-05 16:30:00';   // ปี/เดือน/วัน เวลาสิ้นสุด

// ข้อมูลสรุป (จำลองจากฐานข้อมูล - สามารถลบส่วนนี้ได้เมื่อเชื่อมต่อ API จริง)
const SUMMARY_DATA = {
    M1: { applicants: 125, slots: 150 },
    M4: { applicants: 110, slots: 120 }
};
// **************************************************


// ฟังก์ชันหลักในการตรวจสอบสถานะและอัปเดตหน้าเว็บ
function updateAdmissionStatus() {
    // แปลงสตริงวันที่เป็น Object Date สำหรับ JavaScript
    const now = new Date();
    const startDate = new Date(ADMISSION_START);
    const endDate = new Date(ADMISSION_END);

    // ตรวจสอบว่าอยู่ในช่วงเวลารับสมัครหรือไม่
    const isAdmissionOpen = (now >= startDate && now <= endDate);

    // ==================================================
    // 2. จัดการ Logic การแสดงเมนูและสถานะ
    // ==================================================

    // ฟังก์ชันช่วยแสดงผลสถานะ
    const displayStatus = (id, isOpen) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = isOpen ? 'เปิดรับสมัคร' : 'ปิดรับสมัคร';
            element.className = isOpen ? 'open' : 'closed';
        }
    };

    // อัปเดตสถานะการรับสมัคร ม.1
    const navM1 = document.getElementById('nav-m1');
    if (navM1) {
        navM1.style.display = isAdmissionOpen ? 'list-item' : 'none';
        displayStatus('m1-status', isAdmissionOpen);
    }
    
    // อัปเดตสถานะการรับสมัคร ม.4
    const navM4 = document.getElementById('nav-m4');
    if (navM4) {
        navM4.style.display = isAdmissionOpen ? 'list-item' : 'none';
        displayStatus('m4-status', isAdmissionOpen);
    }
    
    // ==================================================
    // 3. อัปเดตข้อมูลสรุป (จากข้อมูลจำลอง)
    // ==================================================
    
    // อัปเดตข้อมูลสรุป ม.1
    document.getElementById('m1-applicants').textContent = SUMMARY_DATA.M1.applicants.toLocaleString('th-TH');
    document.getElementById('m1-slots').textContent = SUMMARY_DATA.M1.slots.toLocaleString('th-TH');

    // อัปเดตข้อมูลสรุป ม.4
    document.getElementById('m4-applicants').textContent = SUMMARY_DATA.M4.applicants.toLocaleString('th-TH');
    document.getElementById('m4-slots').textContent = SUMMARY_DATA.M4.slots.toLocaleString('th-TH');


    // ==================================================
    // 4. อัปเดตกำหนดการที่แสดงผล
    // ==================================================
    
    // ฟังก์ชันช่วยจัดรูปแบบวันที่
    const formatDate = (date) => date.toLocaleDateString('th-TH', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    const formatTime = (date) => date.toLocaleTimeString('th-TH', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });

    document.getElementById('start-date-display').textContent = formatDate(startDate);
    document.getElementById('end-date-display').textContent = formatDate(endDate);
    document.getElementById('time-range-display').textContent = `${formatTime(startDate)} - ${formatTime(endDate)}`;
}

// เมื่อ DOM โหลดเสร็จแล้ว ให้เริ่มฟังก์ชันหลัก
document.addEventListener('DOMContentLoaded', updateAdmissionStatus);

// *********************************************************************************
// หมายเหตุ: เมื่อคุณย้ายไป Hosting จริงที่มี PHP/SQL ให้ลบโค้ด JavaScript ทั้งหมดใน 
//          ไฟล์นี้ และกลับไปใช้ Logic PHP เพื่อให้การตรวจสอบเวลามีความแม่นยำสูง
//          และสามารถดึงข้อมูลจริงจากฐานข้อมูลได้
// *********************************************************************************
