import { useState } from "react"
import Card from "./Card"
import styles from '../../styles/Card.module.css'

const TenCardsGroup = ({ cardsData }: any): JSX.Element => {
  const [jobs, setJobs] = useState<any>(cardsData)

  const sortedJobs: any = jobs.slice().sort((a: any, b: any): any => {
    const AA: number = new Date(a.birthDate.slice(5)).getTime()
    const BB: number = new Date(b.birthDate.slice(5)).getTime()
    return AA - BB
  })

  const t: Date = new Date();
  const date: string = ('0' + t.getDate()).slice(-2);
  const month: string = ('0' + (t.getMonth() + 1)).slice(-2);
  const year: number = t.getFullYear();
  const fullDate: string = `${year}-${month}-${date}`;
  
  const filteredJobsByDate: any = sortedJobs.filter((job: any) => {
    const jobDateStr: string = job.birthDate.slice(5).replace(/-/g, '')
    const todayDateStr: string = fullDate.slice(5).replace(/-/g, '')
    const jobDateNum: number = Number(jobDateStr)
    const todayDateNum: number = Number(todayDateStr)
    if (jobDateNum > todayDateNum)
    return job
  })

  const [jobList, setJobList] = useState<any>(filteredJobsByDate)

  const insertNextYear = (): void => {
    for (const job of sortedJobs) {
      setJobList((prevState: any) => [...prevState, job])
    } 
  }

  const runFunction = (): void => {
    if (jobList.length < 10)
    insertNextYear()
  }
  runFunction()

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Próximos 10 contactos que se acerca su día de nacimiento</h2>
      <div className={ styles.cardGrid }>
        { jobList.map((job:any, key:number) => {
          if (key < 10) return (
            <Card
              id={ job.id }
              firstName={ job.firstName }
              lastName={ job.lastName }
              age={ job.age }
              email={ job.email }
              birthDate={ job.birthDate }
            />
          )
        })}
      </div>
    </div>
  )
}

export default TenCardsGroup