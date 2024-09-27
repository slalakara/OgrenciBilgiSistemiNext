import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const Attendance = ({ attendance }) => {
  if (!attendance || attendance.length === 0) {
    return <p>Devamsızlık kaydı bulunmamaktadır.</p>;
  }

  const absenceCount = attendance.filter(day => !day.isAttended).length;

  const fromatDate = (dateString) => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Date(dateString).toLocaleString('tr-TR', options);
  };

  return (
    <div>
      <h2>Devamsızlık Kayıtları</h2>
      <div className="accordion-content">
        <ul>
          {attendance.map((day, index) => (
            <li key={index}>
              {fromatDate(day.date)}: {day.isAttended ? 'Katıldı' : 'Katılmadı'}
            </li>
          ))}
        </ul>
        <div>Toplam devamsızlık: <strong>{absenceCount} gün</strong></div>

        {absenceCount > 4 && (
          <div className="alert alert-warning">
            Öğrenci 4 günden fazla devamsızlık yapmıştır!
          </div>
        )}
      </div>
    </div>
  );
};

const ExamResults = ({examResults}) => {
  if(!examResults || examResults.length === 0) {
    return <p>Öğrencinin notu bulunmamaktadır.</p>;
  }

  return(
    <div className='examResults'>
      <ul>
        {examResults.map((x, index) => (
          <li key={index}>
            <p><strong>HTML:</strong> {x.HTML}</p>
            <hr />
            <p><strong>CSS:</strong> {x.CSS}</p>
            <hr />
            <p><strong>JavaScript:</strong> {x.JavaScript}</p>
            <hr />
            <p><strong>React:</strong> {x.React}</p>
            <hr />
            <p><strong>NEXTJS:</strong> {x.nextjs}</p>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default async function UserDetailPage({ params }) {
  const { id } = params;

  const filePath = path.join(process.cwd(), './app/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const studentsData = JSON.parse(jsonData);

  const student = studentsData.find(student => student.id === parseInt(id));

  if (!student) {
    return <h4>Öğrenci bulunamadı!</h4>;
  }

  return (
    <div className='StudentDetail'>
      <h1>Öğrenci Detayları</h1>
      <ul>
        <li>
        <Link href="/students/" ><button className='backbtn'> ◀ Back</button></Link>
          <p><strong>Öğrenci Adı:</strong> {student.name}</p>
          <p><strong>Öğrenci Numarası:</strong> {student.studentNumber}</p>
          <p><strong>E-posta:</strong> {student.email}</p>
          <p><strong>Telefon:</strong> {student.phone}</p>
        </li>
        <li>
          <Attendance attendance={student.attendance} />
        </li>
        <li>
          <ExamResults examResults={student.examResults} />
        </li>
      </ul>
    </div>
  );
}
