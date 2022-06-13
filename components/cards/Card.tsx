import Link from 'next/link'
import styles from '../../styles/Card.module.css'

type jobDetails = {
  infoPage?: boolean,
  id?: number,
  firstName?: string,
  lastName?: string,
  age?: number,
  email?: string,
  birthDate?: string
}

const Card = ({ infoPage=false, id, firstName, lastName, age, email, birthDate }: jobDetails): JSX.Element => {
  return (
    <div className={ styles.cardContainer }>
      <div className={ styles.cardBody }>
        <h3 className={ styles.titleCard }>Datos personales:</h3>
        <div>
          <p>Full name: <span className={ styles.spanBoldText }>{ firstName + ' ' + lastName}</span></p>
          <p>Age: <span className={ styles.spanBoldText }>{ age }</span></p>
        </div>
        <p>Email: <span className={ styles.spanBoldText }>{ email }</span></p>
        <div className={ styles.birthDateBox }>birthdate: <span className={ styles.spanBoldText }>{ birthDate }</span></div>
        {
          infoPage ? null :
          (
            <div className={ styles.moreInfoBtn }>
              <span className={ styles.spanMoreInfoBtn}><Link href={`/jobs/${ id }`}><a>More info...</a></Link></span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Card