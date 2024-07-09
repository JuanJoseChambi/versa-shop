import { success } from "../../utils/alert";

interface PropClipboardButton {
  text: string | null;
  style?: string;
  textButton?: string
}

function ClipboardButton({text, style, textButton = "Copiar"}: PropClipboardButton) {

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
    <button className={`text-nowrap flex justify-center items-center gap-x-1 ${style}`} onClick={copyToClipboard}><i className="bx bx-copy"/> {textButton}</button>
  )
}

export default ClipboardButton