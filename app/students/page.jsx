import Data from "@/app/data.json"
import Link from "next/link"

export default async function StudentsList() {

  return(
    <div className="ListOfStudents">
      <h1>Öğrenci Listesi</h1>
      <ul className="Student">
        {Data.map(x => (
          <li key={x.id}>
            <h3>{x.name} - {x.studentNumber}</h3>
            <p>{x.email}</p>
            <Link href={"/students/" + x.id} >Öğrenci Detayı</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}