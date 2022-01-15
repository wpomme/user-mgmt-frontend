import { VFC } from 'react'
import styles from './index.module.css'

interface InputBoxTypeAndBaseProps<T extends 'text' | 'password' | 'select'> {
  type: T
  name: string
  labelName: string
}

type TextBoxProps = {
  value: string
  onChange: (s: string) => void
  required?: boolean
  placeholder?: string
} & InputBoxTypeAndBaseProps<"text">

type PasswordBoxProps = {
  value: string
  onChange: (s: string) => void
  autoComplete: "current-password" | "new-password"
} & InputBoxTypeAndBaseProps<"password">

type SelectBoxProps = {
  options: {
    [key: string]: string
  }
} & InputBoxTypeAndBaseProps<"select">

type InputBoxProps = TextBoxProps | PasswordBoxProps | SelectBoxProps

export const InputBox: VFC<InputBoxProps> = (props) => (
  <div className={styles["inputbox"]}>
    {props.type === "text" && (
      <>
        <label htmlFor={props.name}>{props.labelName}</label>
        <input
          type={props.type}
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={(ev) => {
            props.onChange(ev.currentTarget.value)
          }}
          required={props.required}
          placeholder={props.placeholder}
        />
      </>
    )}
    {props.type === "password" && (
      <>
        <label htmlFor={props.name}>{props.labelName}</label>
        <input
          type={props.type}
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={(ev) => {
            props.onChange(ev.currentTarget.value)
          }}
          required
          autoComplete={props.autoComplete}
        />
      </>
    )}
    {props.type === "select" && (
      <>
        <label htmlFor={props.name}>{props.labelName}</label>
        <select name={props.name} id={props.name}>
          {Object.keys(props.options).map((key) => (
            <option key={key} value={key}>{props.options[key]}</option>
          ))}
        </select>
      </>
    )}
  </div>
)
