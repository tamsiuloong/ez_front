export function dateFormat(longTypeDate){
    var dateType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateType += date.getFullYear();  //年
    dateType += "-" + getMonth(date); //月
    dateType += "-" + getDay(date);  //日
    return dateType;
}
//返回 01-12 的月份值
export function getMonth(date){
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if(month<10){
        month = "0" + month;
    }
    return month;
}
//返回01-30的日期
export function getDay(date){
    var day = "";
    day = date.getDate();
    if(day<10){
        day = "0" + day;
    }
    return day;
}