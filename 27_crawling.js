// axios - 특정 웹사이트 페이지 내용 가져오기
// cheerio - HTML 구조를 가지고 있는 일반 텍스트를, 자바스크립트에서 document 객체의 내장함수를 사용해서 html 요소에 접근하는 것과 유사한 함수를 제공

const axios = require('axios');
const cheerio = require('cheerio');


const getHTML = async (keyword) => {
    try {
        const html = await axios.get(`https://www.inflearn.com/courses?s=${keyword}`);
        console.log('Get HTML');
        return html.data;
    } catch(e){
        console.log('error :', e);
    }
}

const parsing = async (page) => {
    const $ = cheerio.load(page);
    const courses = [];
    const $courseList = $(".course_card_item");  // 기준점 parsing
    
    $courseList.each((idx, node) => {
        const title = $(node).find('.course_title:eq(0)').text();
        const instructor = $(node).find('.instructor:eq(0)').text();
        let price = $(node).find('.pay_price').length > 0 ? $(node).find('.pay_price:eq(0)').text() : $(node).find('.price').text();
        console.log(price);
    })
}

const getCourse = async (keyword) => {
    const html = await getHTML(keyword);
    const courses = await parsing(html);
    console.log(courses);
    return courses
}

const getFullCourse = async () => {
    let courses = [];
    let i = 1;
    while (i <= 20) {
        const course = await getCourse(`java&order=search&page=${i}`);
        courses = courses.concat(course);
        i++;
    }
    console.log(courses.length);
}

getFullCourse();