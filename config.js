// ไฟล์กำหนดค่าผู้ดูแลระบบ
// สามารถเปลี่ยนรหัสผ่านได้ที่นี่ โดยไม่ต้องแก้ไขไฟล์ HTML

const ADMIN_CONFIG = {
    username: "admin",
    password: "bpt2024"
};

// ฟังก์ชันตรวจสอบสิทธิ์ผู้ดูแล
function verifyAdminCredentials(username, password) {
    // ใช้การเข้ารหัสแบบง่ายเพื่อเพิ่มความปลอดภัย
    const hashedUsername = btoa(ADMIN_CONFIG.username);
    const hashedPassword = btoa(ADMIN_CONFIG.password);
    
    const inputHashedUsername = btoa(username);
    const inputHashedPassword = btoa(password);
    
    return inputHashedUsername === hashedUsername && inputHashedPassword === hashedPassword;
}

// ฟังก์ชันสำหรับเปลี่ยนรหัสผ่าน (สำหรับผู้ดูแลเท่านั้น)
function changeAdminPassword(newPassword) {
    if (isAdmin) {
        ADMIN_CONFIG.password = newPassword;
        console.log("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
        return true;
    }
    return false;
}
