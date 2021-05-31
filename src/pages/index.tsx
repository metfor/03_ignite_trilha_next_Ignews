
import Head from "next/head"
import styles from "./home.module.scss"
export default function Home() {
  return (
    <>
      <Head>
      <title>IgNews | Home</title>
    </Head>
    
    
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
      <span>👏Hey, welcom</span>
      <h1>News about the <span>React</span>word.</h1>
      <p>
        Get access to all the publications<br/>
        <span>for $9.90 month</span>
      </p>
      </section>
      <img src="/images/avatar.svg" alt="girl coding"/>
    </main>
    </>
  )
}
