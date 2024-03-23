import dayjs from 'dayjs'

interface ITool {
  dateForMat(date: string | number | Date, fmt?: string): string
}

// 工具类
const myTool: ITool = {
  // * 格式化时间
  dateForMat(date, fmt = 'YYYY-MM-DD hh:mm:ss') {
    return dayjs(date).format(fmt)
  }
}

export default myTool
