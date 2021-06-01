import styles from "./styles.module.scss"
interface SubButtonProps{
    priceId:string;
}
export function SubButton({priceId}:SubButtonProps){
    return (
        <button 
            type="button"
            className={styles.subButton}
        >
            Subscribe now
        </button>
    )
}