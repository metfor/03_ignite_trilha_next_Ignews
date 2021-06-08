import { GetStaticProps } from "next"
import { useSession } from "next-auth/client"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { RichText } from "prismic-dom"
import React, { useEffect } from "react"

import { getPrismicClient } from "../../../services/prismic"
import styles from "../post.module.scss"
interface PostPreviewProps{
    post:{
        slug:string;
        title:string;
        content:string;
        updateAt:string;
    }
}
export default function PostPreview ({post}:PostPreviewProps){
    const [session]=useSession()
    const router=useRouter()
    useEffect(()=>{
        if(session?.activeSub){
            router.push(`/posts/${post.slug}`)
        }

    },[session])
    return(
        <>
        <Head>
            <title>{post.title}| IgNews</title>
        </Head>
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updateAt}</time>
                <div className={`${styles.postContent} , ${styles.previewContent}`} dangerouslySetInnerHTML={{__html:post.content}}/>
                <div className={styles.continueReading}>
                    Wanna Continue Reading ?
                    <Link href="/">
                    <a>Subscribe Now✌</a>
                    </Link>
                </div>
            </article>
        </main>
        </>
    )
}
export const getStaticPaths =()=>{
    return{
        paths:[],
        fallback:"blocking"
    }
}
export const getStaticProps: GetStaticProps = async({params})=>{
    
    const {slug}=params;



    //ignews
    const prismic =getPrismicClient()
    const response = await prismic.getByUID("posts",String(slug),{})
    const post ={
        slug,
        title:RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 2)),
        updateAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR",{
            day:"2-digit",
            month:"long",
            year:"numeric"
        })
    };
    return { 
        props:{
            post,
        }     
    }
}