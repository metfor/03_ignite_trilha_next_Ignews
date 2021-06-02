import { useSession,signIn } from "next-auth/client";

import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss"
interface SubButtonProps{
    priceId:string;
}

export function SubButton({priceId}:SubButtonProps){
    const [session]= useSession();
   async function handleSub(){
        if(!session){
            signIn("github")
            return
        }
        // criação da checkout sessions
        try{
            const response= await api.post("/sub")
            const{sessionId}=response.data;
            const stripe = await getStripeJs()
            await stripe.redirectToCheckout({sessionId})
        }catch(err){
            alert(err.message)  
        }
    }
    return (
        <button 
            type="button"
            className={styles.subButton}
            onClick={handleSub}
        >
            Subscribe now
        </button>
    )
}