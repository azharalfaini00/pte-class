import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
// Serve static files from the uploads directory
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper to read data
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

// Helper to write data
const writeData = (data: any) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

// --- API ENDPOINTS ---

// 1. Get Pricing Data
app.get('/api/pricing', (req, res) => {
  const data = readData();
  if (data) {
    if (!data.settings) {
      data.settings = { demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" };
    }
    if (!data.schedules) {
      data.schedules = [
        { id: "morning", name: "Pagi (09.00 - 12.00)" },
        { id: "afternoon", name: "Siang / Sore (13.00 - 17.00)" },
        { id: "evening", name: "Malam (19.00 - 21.00) - Paling Diminati" },
        { id: "weekend", name: "Akhir Pekan (Sabtu & Minggu)" }
      ];
    }
    if (!data.tutors) {
      data.tutors = [
        {
          id: "tutor_1",
          name: "Sarah Jenkins, M.Ed.",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          certifications: ["CELTA Certified", "IELTS Examiner"],
          experience: "8+ Tahun Mengajar",
          specialty: "Speaking Coach & IELTS",
          achievements: "Membantu 500+ siswa mencapai band 7.0+ IELTS dalam 2 tahun terakhir."
        },
        {
          id: "tutor_2",
          name: "David Chen, Ph.D.",
          photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          certifications: ["TESOL Certified", "PTE Academic Expert"],
          experience: "10+ Tahun Mengajar",
          specialty: "PTE Specialist",
          achievements: "Author buku 'PTE Success Strategies' dengan tingkat kelulusan siswa 95%."
        },
        {
          id: "tutor_3",
          name: "Elena Rodriguez, B.A.",
          photo: "https://images.unsplash.com/photo-1580894732444-8ecded790047?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          certifications: ["TEFL Certified", "Business Comm."],
          experience: "5+ Tahun Mengajar",
          specialty: "Business English Specialist",
          achievements: "Corporate Trainer untuk 10+ perusahaan multinasional di Asia Tenggara."
        },
        {
          id: "tutor_4",
          name: "Michael Smith, M.A.",
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          certifications: ["DELTA Certified", "Cambridge English"],
          experience: "12+ Tahun Mengajar",
          specialty: "Advanced Grammar & Writing",
          achievements: "Mantan jurnalis internasional, ahli dalam penulisan esai akademik tingkat lanjut."
        }
      ];
    }
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// 2. Update Pricing Data (Protected ideally)
app.post('/api/pricing', (req, res) => {
  const newData = req.body;
  // In a real app, verify authentication token here
  
  if (writeData(newData)) {
    res.json({ success: true, message: 'Data saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// 3. Login Verification
app.post('/api/login', (req, res) => {
  const { pin } = req.body;
  
  // Hardcoded PIN. In production, check against DB or env var.
  const CORRECT_PIN = 'admin123';
  
  if (pin === CORRECT_PIN) {
    res.json({ success: true, token: 'dummy-auth-token-123' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid PIN' });
  }
});

// Register student
app.post('/api/register', (req, res) => {
  const student = req.body;
  const data = readData() || {};
  if (!data.students) {
    data.students = [];
  }
  student.id = Date.now().toString();
  student.registeredAt = new Date().toISOString();
  student.paymentStatus = 'pending'; // New field for payment gateway
  data.students.push(student);
  
  if (writeData(data)) {
    res.json({ success: true, student });
  } else {
    res.status(500).json({ error: 'Failed to register student' });
  }
});

// Simulate Payment
app.post('/api/payment/simulate', (req, res) => {
  const { studentId } = req.body;
  const data = readData() || {};
  if (!data.students) return res.status(404).json({ error: 'No students found' });

  const student = data.students.find((s: any) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  student.paymentStatus = 'paid';
  
  if (writeData(data)) {
    res.json({ success: true, student });
  } else {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Get students count/list
app.get('/api/students', (req, res) => {
  const data = readData() || {};
  res.json({ students: data.students || [] });
});

// 4. File Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return the public URL for the uploaded file
  // Since we serve static files from /uploads, the URL is simply /uploads/filename
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
