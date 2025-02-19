import { SvgIcon } from '@/icons/type'

export default function ExpandArrowDown(props: SvgIcon) {
  const { width = 10, height = 5 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 10 5" fill="none" className="chakra-icon" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.10543 1.01799C9.33465 1.19824 9.33465 1.49047 9.10543 1.67071L5.19238 4.74763C4.96316 4.92787 4.59152 4.92787 4.3623 4.74763L0.44926 1.67071C0.220038 1.49047 0.220038 1.19824 0.44926 1.01799C0.67848 0.837752 1.05012 0.837752 1.27934 1.01799L4.77734 3.76856L8.27535 1.01799C8.50457 0.837752 8.87621 0.837752 9.10543 1.01799Z"
        fill="#C4D6FF"
      />
    </svg>
  )
}
