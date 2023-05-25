const SplitingSchedule = (schedule) => {
    // console.log('schedule in splliting is ',schedule);
    const scheduleCharArray = [...schedule];
    // console.log('schedule char array is',scheduleCharArray);
    const scheduleObj = [
      {
        row: 1,
        schedule: {
          0: scheduleCharArray[0],
          1: scheduleCharArray[1],
          2: scheduleCharArray[2],
          3: scheduleCharArray[3],
          4: scheduleCharArray[4],
          5: scheduleCharArray[5],
          6: scheduleCharArray[6],
        },
      },
      {
        row: 2,
        schedule: {
          7: scheduleCharArray[7],
          8: scheduleCharArray[8],
          9: scheduleCharArray[9],
          10: scheduleCharArray[10],
          11: scheduleCharArray[11],
          12: scheduleCharArray[12],
          13: scheduleCharArray[13],
        },
      },
      {
        row: 3,
        schedule: {
          14: scheduleCharArray[14],
          15: scheduleCharArray[15],
          16: scheduleCharArray[16],
          17: scheduleCharArray[17],
          18: scheduleCharArray[18],
          19: scheduleCharArray[19],
          20: scheduleCharArray[20],
        },
      },
      {
        row: 4,
        schedule: {
          21: scheduleCharArray[21],
          22: scheduleCharArray[22],
          23: scheduleCharArray[23],
          24: scheduleCharArray[24],
          25: scheduleCharArray[25],
          26: scheduleCharArray[26],
          27: scheduleCharArray[27],
        },
      },
      {
        row: 5,
        schedule: {
          28: scheduleCharArray[28],
          29: scheduleCharArray[29],
          30: scheduleCharArray[30],
          31: scheduleCharArray[31],
          32: scheduleCharArray[32],
          33: scheduleCharArray[33],
          34: scheduleCharArray[34],
        },
      },
      {
        row: 6,
        schedule: {
          35: scheduleCharArray[35],
          36: scheduleCharArray[36],
          37: scheduleCharArray[37],
          38: scheduleCharArray[38],
          39: scheduleCharArray[39],
          40: scheduleCharArray[40],
          41: scheduleCharArray[41],
        },
      },
      {
        row: 7,
        schedule: {
          42: scheduleCharArray[42],
          43: scheduleCharArray[43],
          44: scheduleCharArray[44],
          45: scheduleCharArray[45],
          46: scheduleCharArray[46],
          47: scheduleCharArray[47],
          48: scheduleCharArray[48],
        },
      },
      {
        row: 8,
        schedule: {
          49: scheduleCharArray[49],
          50: scheduleCharArray[50],
          51: scheduleCharArray[51],
          52: scheduleCharArray[52],
          53: scheduleCharArray[53],
          54: scheduleCharArray[54],
          55: scheduleCharArray[55],
        },
      },
      {
        row: 9,
        schedule: {
          56: scheduleCharArray[56],
          57: scheduleCharArray[57],
          58: scheduleCharArray[58],
          59: scheduleCharArray[59],
          60: scheduleCharArray[60],
          61: scheduleCharArray[61],
          62: scheduleCharArray[62],
        },
      },
      {
        row: 10,
        schedule: {
          63: scheduleCharArray[63],
          64: scheduleCharArray[64],
          65: scheduleCharArray[65],
          66: scheduleCharArray[66],
          67: scheduleCharArray[67],
          68: scheduleCharArray[68],
          69: scheduleCharArray[69],
        },
      },
      {
        row: 11,
        schedule: {
          70: scheduleCharArray[70],
          71: scheduleCharArray[71],
          72: scheduleCharArray[72],
          73: scheduleCharArray[73],
          74: scheduleCharArray[74],
          75: scheduleCharArray[75],
          76: scheduleCharArray[76],
        },
      },
      {
        row: 12,
        schedule: {
          77: scheduleCharArray[77],
          78: scheduleCharArray[78],
          79: scheduleCharArray[79],
          80: scheduleCharArray[80],
          81: scheduleCharArray[81],
          82: scheduleCharArray[82],
          83: scheduleCharArray[83],
        },
      },
      {
        row: 13,
        schedule: {
          84: scheduleCharArray[84],
          85: scheduleCharArray[85],
          86: scheduleCharArray[86],
          87: scheduleCharArray[87],
          88: scheduleCharArray[88],
          89: scheduleCharArray[89],
          90: scheduleCharArray[90],
        },
      },
      {
        row: 14,
        schedule: {
          91: scheduleCharArray[91],
          92: scheduleCharArray[92],
          93: scheduleCharArray[93],
          94: scheduleCharArray[94],
          95: scheduleCharArray[95],
          96: scheduleCharArray[96],
          97: scheduleCharArray[97],
        },
      },
      {
        row: 15,
        schedule: {
          98: scheduleCharArray[98],
          99: scheduleCharArray[99],
          100: scheduleCharArray[100],
          101: scheduleCharArray[101],
          102: scheduleCharArray[102],
          103: scheduleCharArray[103],
          104: scheduleCharArray[104],
        },
      },
      {
        row: 16,
        schedule: {
          105: scheduleCharArray[105],
          106: scheduleCharArray[106],
          107: scheduleCharArray[107],
          108: scheduleCharArray[108],
          109: scheduleCharArray[109],
          110: scheduleCharArray[110],
          111: scheduleCharArray[111],
        },
      },
    ];
    // console.log('return split is ',scheduleObj);
    return scheduleObj;
  };
  const JoiningSchedule=(schedule)=>{
  console.log('inside joining  schedule',schedule);
  let i=0;
  let st=''
  const scheduleString=schedule.map((item)=>{
    for (let index = 0; index < 7; index++,i++) {
      const str=item.schedule[i]
      str.toString()
      st+=str
    }
  })
  return st
  }
  // "All"
  const days = ["Mon", "Tue", "Wed", "Thu", "Frid", "Sat", "Sun", ];
  const timeslots = [
    {
      time: "08:00-9:00",
    },
    {
      time: "09:00-10:00",
    },
    {
      time: "10:00-11:00",
    },
    {
      time: "11:00-12:00",
    },
    {
      time: "12:00-13:00",
    },
    {
      time: "13:00-14:00",
    },
    {
      time: "14:00-15:00",
    },
    {
      time: "15:00-16:00",
    },
    {
      time: "16:00-17:00",
    },
    {
      time: "17:00-18:00",
    },
    {
      time: "18:00-19:00",
    },
    {
      time: "19:00-20:00",
    },
    {
      time: "20:00-21:00",
    },
    {
      time: "21:00-22:00",
    },
    {
      time: "22:00-23:00",
    },
    {
      time: "23:00-00:00",
    },
  ];
  
  const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export {
    SplitingSchedule,
    JoiningSchedule,
    days,
    timeslots,
    slots
}