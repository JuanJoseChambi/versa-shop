import { success } from "../../utils/alert";

function ClipboardButton({text, style}: {text: string | null, style: string}) {

    const copyToClipboard = () => {
        if(!text) return;
        navigator.clipboard.writeText(text)
          .then(() => {
            success('Copied to clipboard!');
            // setTimeout(() => setCopySuccess(false), 1500); // Reset copy success message after 1.5s
          })
          .catch((error) => {
            console.error('Error copying to clipboard:', error);
          });
      };

  return (
    <button className={style} onClick={copyToClipboard}>Copiar</button>
  )
}

export default ClipboardButton