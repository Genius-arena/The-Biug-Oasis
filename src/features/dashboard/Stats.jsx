import PropTypes from "prop-types";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings?.length;
console.log(bookings)
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays?.length;

  const occupation = confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) / numDays * cabinCount;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="blue"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkins}
      />

      <Stat
        title="Occupancy rate"
        color="bluyellowe"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.string,
  numDays: PropTypes.number,
  cabinCount: PropTypes.number,
};

export default Stats;
