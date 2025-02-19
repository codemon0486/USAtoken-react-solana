import { SvgIcon } from '@/icons/type'

export default function Telegram(props: SvgIcon) {
  const { width = 21, height = 20 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill="none" className="chakra-icon" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.39445 8.79735L12.1206 5.03862C16.2761 3.31023 17.1395 3.01001 17.7023 3.00011C17.8261 2.99792 18.1029 3.0286 18.2821 3.17407C18.4335 3.29688 18.4751 3.46286 18.4951 3.57927C18.5151 3.69568 18.5398 3.96104 18.5201 4.16834C18.2949 6.5343 17.3206 12.2761 16.8249 14.926C16.6151 16.0474 16.2024 16.4233 15.8023 16.4601C14.9333 16.5401 14.2735 15.8858 13.4319 15.3342L10.0926 13.0911C8.61526 12.1176 9.57296 11.5825 10.4149 10.7081C10.6352 10.4791 14.4638 6.99681 14.5378 6.68091C14.5468 6.64141 14.5557 6.49417 14.4682 6.41636C14.3808 6.33856 14.2516 6.36549 14.1584 6.38635C14.0263 6.41633 11.9225 7.80689 7.8469 10.5581C7.24972 10.9681 6.70881 11.168 6.22421 11.1575C5.68994 11.1459 4.66224 10.8554 3.89826 10.6071C2.96118 10.3025 2.2164 10.1414 2.28128 9.6241C2.31504 9.35467 2.6861 9.07914 3.39442 8.79741L3.39445 8.79735Z"
        fill="url(#paint0_linear_12731_11912)"
      />
      <defs>
        <linearGradient id="paint0_linear_12731_11912" x1="17.671" y1="26.146" x2="2.10698" y2="25.4814" gradientUnits="userSpaceOnUse">
          <stop stopColor="#39D0D8" />
          <stop offset="1" stopColor="#22D1F8" />
        </linearGradient>
      </defs>
    </svg>
  )
}
