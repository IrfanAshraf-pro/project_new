
// returning slot strings agais values
const slotsToStringSlot=(slot)=>{
    const slotArr=slot.split(',')
    const slot1=slotArr.map(item=>slotCondition(+item))
    return slot1
    }
// matching slot condition number agaist string slot
const slotCondition=(value)=> {
    const mon = "Mon";
    const tue = "Tue";
    const wed = "Wed";
    const thr = "Thr";
    const fri = "Fri";
    const sat = "Sat";
    const sun = "Sun";
    const s1 = "08:00 - 09:00 ";
    const s2 = "09:00 - 10:00 ";
    const s3 = "10:00 - 11:00 ";
    const s4 = "11:00 - 12:00 ";
    const s5 = "12:00 - 13:00 ";
    const s6 = "13:00 - 14:00 ";
    const s7 = "14:00 - 15:00 ";
    const s8 = "15:00 - 16:00 ";
    const s9 = "16:00 - 17:00 ";
    const s10 = "17:00 - 18:00 ";
    const s11 = "18:00 - 19:00 ";
    const s12 = "19:00 - 20:00 ";
    const s13 = "20:00 - 21:00 ";
    const s14 = "21:00 - 22:00 ";
    const s15 = "22:00 - 23:00 ";
    const s16 = "23:00 - 00:00 ";
    let slot = "";
  
    if ((value / 7) <= 1) {
      slot = s1;
    } else if ((value / 7) > 1 && (value / 7) <= 2) {
      slot = s2;
    } else if ((value / 7) > 2 && (value / 7) <= 3) {
      slot = s3;
    } else if ((value / 7) > 3 && (value / 7) <= 4) {
      slot = s4;
    } else if ((value / 7) > 4 && (value / 7) <= 5) {
      slot = s5;
    } else if ((value / 7) > 5 && (value / 7) <= 6) {
      slot = s6;
    } else if ((value / 7) > 6 && (value / 7) <= 7) {
      slot = s7;
    } else if ((value / 7) > 7 && (value / 7) <= 8) {
      slot = s8;
    } else if ((value / 7) > 8 && (value / 7) <= 9) {
      slot = s9;
    } else if ((value / 7) > 9 && (value / 7) <= 10) {
      slot = s10;
    } else if ((value / 7) > 10 && (value / 7) <= 11) {
      slot = s11;
    } else if ((value / 7) > 11 && (value / 7) <= 12) {
      slot = s12;
    } else if ((value / 7) > 12 && (value / 7) <= 13) {
      slot = s13;
    } else if ((value / 7) > 13 && (value / 7) <= 14) {
      slot = s14;
    } else if ((value / 7) > 14 && (value / 7) <= 15) {
      slot = s15;
    } else if ((value / 7) > 15 && (value / 7) <= 16) {
      slot = s16;
    }
    if (value % 7 == 0) {
      slot += sun;
    } else if (value % 7 == 1) {
      slot += mon;
    } else if (value % 7 == 2) {
      slot += tue;
    } else if (value % 7 == 3) {
      slot += wed;
    } else if (value % 7 == 4) {
      slot += thr;
    } else if (value % 7 == 5) {
      slot += fri;
    } else if (value % 7 == 6) {
      slot += sat;
    }
    return slot;
  }

export{
    slotsToStringSlot
}