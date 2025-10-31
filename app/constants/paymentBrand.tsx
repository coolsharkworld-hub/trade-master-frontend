import Amex from '@/app/assets/pay-brand/american-express.svg'
import DinersClub from '@/app/assets/pay-brand/diners-club.svg'
import Discover from '@/app/assets/pay-brand/discover.svg'
import Jcb from '@/app/assets/pay-brand/jcb.svg'
import MasterCard from '@/app/assets/pay-brand/master-card.svg'
import UnionPay from '@/app/assets/pay-brand/unionpay.svg'
import Visa from '@/app/assets/pay-brand/visa.svg'

export const paymentBrandList = {
  visa: <Visa />,
  mastercard: <MasterCard />,
  amex: <Amex />,
  discover: <Discover />,
  diners: <DinersClub />,
  jcb: <Jcb />,
  unionpay: <UnionPay />,
  unknown: null
}
