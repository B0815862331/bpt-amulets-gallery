// ข้อมูลตัวอย่าง - พร้อมระบบจัดการแกลเลอรี
let data = {
    "categories": {
        "พระยอดนิยม": [
            {
                "name": "พระบางลำพูน",
                "data": "https://images.unsplash.com/photo-1586947201838-5d66c1b94a5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVkZGhhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                "createdAt": "2024-01-15T10:30:00Z",
                "createdBy": "ผู้ใช้"
            }
        ]
    },
    "albums": {
        "พระเครื่องกรุงเทพมหานคร": {
            "photos": [
                {
                    "name": "พระกรุวัดราชบพิธ",
                    "data": "https://images.unsplash.com/photo-1547994777-8d47e752ad49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1ZGRoYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                    "createdAt": "2024-01-16T14:20:00Z",
                    "createdBy": "ผู้ใช้"
                }
            ],
            "description": "",
            "createdAt": "2024-01-16T14:15:00Z",
            "createdBy": "ผู้ใช้"
        }
    },
    "history": [
        {
            "type": "สร้างหมวดหมู่",
            "details": "สร้างหมวดหมู่ 'พระยอดนิยม'",
            "timestamp": "2024-01-15T10:30:00Z"
        },
        {
            "type": "เพิ่มรูปภาพ",
            "details": "เพิ่มรูปภาพ 'พระบางลำพูน' ในหมวดหมู่ 'พระยอดนิยม'",
            "timestamp": "2024-01-15T10:30:00Z"
        },
        {
            "type": "สร้างอัลบั้ม",
            "details": "สร้างอัลบั้ม 'พระเครื่องกรุงเทพมหานคร'",
            "timestamp": "2024-01-16T14:15:00Z"
        },
        {
            "type": "เพิ่มรูปภาพ",
            "details": "เพิ่มรูปภาพ 'พระกรุวัดราชบพิธ' ในอัลบั้ม 'พระเครื่องกรุงเทพมหานคร'",
            "timestamp": "2024-01-16T14:20:00Z"
        }
    ]
};

// ตัวแปร global
let catSelect, gallery, searchBox, albumModal, modalAlbumTitle, albumModalContent;
let tabGallery, tabAlbums, tabHistory, imageModal, modalImageTitle, imageModalContent;
let fullscreenMode, fullscreenImage, fullscreenCounter, fullscreenZoomLevel;
let createAlbumModal, createAlbumForm, addPhotosModal, addPhotosTitle, uploadedFiles;
let addGalleryPhotoModal, addGalleryPhotoForm, galleryPhotoPreview, historyModal, historyContent;
let volumeBtn, dragInfo, fullscreenDragInfo, adminLogin, adminMode, adminPassword, adminUsername;
let addAlbumBtn, addPhotoBtn, albumActions, historyActions, readOnlyNote;

let currentTab = 'gallery';
let currentImages = [];
let currentImageIndex = 0;
let currentZoom = 1;
let fullscreenZoom = 1;
let showFullscreenInfo = true;
let currentAlbumName = '';
let selectedFiles = [];
let selectedGalleryPhoto = null;
let isMuted = false;
let isAdmin = false;
let speechSynthesis = window.speechSynthesis;

// ตัวแปรสำหรับการลากเม้าขยับรูป
let currentTranslateX = 0, currentTranslateY = 0;
let fullscreenCurrentTranslateX = 0, fullscreenCurrentTranslateY = 0;

// ฟังก์ชันเริ่มต้น
function initialize() {
    // อ้างอิง DOM elements
    catSelect = document.getElementById('categorySelect');
    gallery = document.getElementById('gallery');
    searchBox = document.getElementById('searchBox');
    albumModal = document.getElementById('albumModal');
    modalAlbumTitle = document.getElementById('modalAlbumTitle');
    albumModalContent = document.getElementById('albumModalContent');
    tabGallery = document.getElementById('tabGallery');
    tabAlbums = document.getElementById('tabAlbums');
    tabHistory = document.getElementById('tabHistory');
    imageModal = document.getElementById('imageModal');
    modalImageTitle = document.getElementById('modalImageTitle');
    imageModalContent = document.getElementById('imageModalContent');
    fullscreenMode = document.getElementById('fullscreenMode');
    fullscreenImage = document.getElementById('fullscreenImage');
    fullscreenCounter = document.getElementById('fullscreenCounter');
    fullscreenZoomLevel = document.getElementById('fullscreenZoomLevel');
    createAlbumModal = document.getElementById('createAlbumModal');
    createAlbumForm = document.getElementById('createAlbumForm');
    addPhotosModal = document.getElementById('addPhotosModal');
    addPhotosTitle = document.getElementById('addPhotosTitle');
    uploadedFiles = document.getElementById('uploadedFiles');
    addGalleryPhotoModal = document.getElementById('addGalleryPhotoModal');
    addGalleryPhotoForm = document.getElementById('addGalleryPhotoForm');
    galleryPhotoPreview = document.getElementById('galleryPhotoPreview');
    historyModal = document.getElementById('historyModal');
    historyContent = document.getElementById('historyContent');
    volumeBtn = document.getElementById('volumeBtn');
    dragInfo = document.getElementById('dragInfo');
    fullscreenDragInfo = document.getElementById('fullscreenDragInfo');
    adminLogin = document.getElementById('adminLogin');
    adminMode = document.getElementById('adminMode');
    adminUsername = document.getElementById('adminUsername');
    adminPassword = document.getElementById('adminPassword');
    addAlbumBtn = document.getElementById('addAlbumBtn');
    addPhotoBtn = document.getElementById('addPhotoBtn');
    albumActions = document.getElementById('albumActions');
    historyActions = document.getElementById('historyActions');
    readOnlyNote = document.getElementById('readOnlyNote');

    // ตั้งค่า event listeners
    setupEventListeners();
    
    // โหลดข้อมูลและเรนเดอร์
    loadData();
}

// ระบบ Admin
function loginAdmin() {
    const username = adminUsername.value;
    const password = adminPassword.value;
    
    if (!username || !password) {
        alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
        return;
    }

    // ใช้ฟังก์ชันจาก config.js เพื่อตรวจสอบสิทธิ์
    if (verifyAdminCredentials(username, password)) {
        isAdmin = true;
        adminMode.classList.add('active');
        adminLogin.style.display = 'none';
        addAlbumBtn.style.display = 'flex';
        addPhotoBtn.style.display = 'flex';
        albumActions.style.display = 'flex';
        historyActions.style.display = 'flex';
        readOnlyNote.style.display = 'none';
        speakText('เข้าสู่โหมดผู้ดูแลระบบเรียบร้อยแล้ว');
        
        // เคลียร์ช่องกรอกข้อมูล
        adminUsername.value = '';
        adminPassword.value = '';
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        adminPassword.value = '';
    }
}

function logoutAdmin() {
    isAdmin = false;
    adminMode.classList.remove('active');
    adminLogin.style.display = 'flex';
    addAlbumBtn.style.display = 'none';
    addPhotoBtn.style.display = 'none';
    albumActions.style.display = 'none';
    historyActions.style.display = 'none';
    readOnlyNote.style.display = 'block';
    speakText('ออกจากโหมดผู้ดูแลระบบแล้ว');
}

// ฟังก์ชันอื่นๆ ทั้งหมดยังคงเหมือนเดิม...
// (โค้ดที่เหลือเหมือนเดิมทั้งหมด)
