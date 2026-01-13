const express = require('express');
const router = express.Router();

router.get('/activities', (req, res) => {
  const data = [
    { id: 1, title: 'Kegiatan Belajar', unit: 'SDIT', date: new Date(), description: 'Aktivitas kelas pagi' },
    { id: 2, title: 'Eskul Pramuka', unit: 'SMP', date: new Date(), description: 'Latihan rutin' }
  ];
  res.status(200).json({ success: true, data });
});

router.get('/events', (req, res) => {
  const data = [
    { id: 1, title: 'Upacara Bendera', unit: 'Semua', date: new Date(), location: 'Lapangan' },
    { id: 2, title: 'Pentas Seni', unit: 'SMA', date: new Date(), location: 'Aula' }
  ];
  res.status(200).json({ success: true, data });
});

module.exports = router;
