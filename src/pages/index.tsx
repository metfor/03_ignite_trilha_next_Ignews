import{GetStaticProps } from"next"
import Head from "next/head"
import {stripe} from "../services/stripe"
import { SubButton } from "../components/SubButton"
import styles from "./home.module.scss"
interface HomeProps{
  product:
  {
  priceId:"string";
  amount:"number";
}
}
export default function Home({product}:HomeProps) {
  
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
        <span>for {product.amount} month</span>
      </p>
      <SubButton priceId={product.priceId} />
      </section>
      <img src="/images/avatar.svg" alt="girl coding"/>
    </main>
    </>
  )
}
//ssg
export const getStaticProps:GetStaticProps = async() => {
  const price= await stripe.prices.retrieve("price_1IxX7AFcpXKFm0EhN4wEH4X2",{
    expand:["product"]
  })
  const product ={
    priceId: price.id,
    amount:new Intl.NumberFormat("en-US",{
      style:"currency",
      currency:"USD",
    }).format(price.unit_amount/100)

  }
  
  return{
    props:{
      product
    },revalidate:60*60*24,//24 hours
  }
}
//ssr
/*export const getServerSideProps:GetServerSideProps = async() => {
  const price= await stripe.prices.retrieve("price_1IxX7AFcpXKFm0EhN4wEH4X2",{
    expand:["product"]
  })
  const product ={
    priceId: price.id,
    amount:new Intl.NumberFormat("en-US",{
      style:"currency",
      currency:"USD",
    }).format(price.unit_amount/100)

  }
  
  return{
    props:{
      product
    }
  }
}*/