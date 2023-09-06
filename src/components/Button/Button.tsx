import './button.css'
type Props = {
  label?:string
}

export const Button = ({label}: Props) => {
  return (
    <button className='uikit_btn'>{label}</button>
  )
}

