import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/finally';

@IonicPage({
    priority: 'low', // high > low > off(链接将不会加载)
    name: 'MusicPage',
    segment: 'tabs/music'
})
@Component({
    selector: 'page-music',
    templateUrl: 'music.html'
})
export class MusicPage {
    onFocusInput = false;
    animated = true;
    debounce = 500;
    searchText: string;
    movieInTheaters: any;

    constructor(
    ) {
    }

    ionViewDidLoad() {
        this.getMovieInTheaters();
    }
    onInput(event) {
        console.log(this.searchText);
    }

    onCancel() {
        this.onFocusInput = false;
        let tabBarElement : any = document.querySelector('#myTabs .tabbar.show-tabbar');
        tabBarElement.style.opacity = 1;
    }

    onFocus() {
        this.onFocusInput = true;
        let tabBarElement : any = document.querySelector('#myTabs .tabbar.show-tabbar');
        tabBarElement.style.opacity = 0;
    }
    onBlur() {
    }

    getMovieInTheaters() {
        this.movieInTheaters = {
            title: '影院热映',
            total: 65,
            subjects: [
                {
                    rating: {
                        max: 10,
                        average: 7.4,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "喜剧",
                        "动作",
                        "冒险"
                    ],
                    title: "王牌特工2：黄金圈",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1031223/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1497.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1497.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1497.jpg"
                            },
                            name: "科林·费尔斯",
                            id: "1031223"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1340497/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1427190401.6.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1427190401.6.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1427190401.6.jpg"
                            },
                            name: "塔伦·埃格顿",
                            id: "1340497"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1054519/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1364.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1364.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1364.jpg"
                            },
                            name: "朱丽安·摩尔",
                            id: "1054519"
                        }
                    ],
                    collect_count: 11453,
                    original_title: "Kingsman: The Golden Circle",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1031852/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/9038.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/9038.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/9038.jpg"
                            },
                            name: "马修·沃恩",
                            id: "1031852"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2499792043.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2499792043.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2499792043.webp"
                    },
                    alt: "https://movie.douban.com/subject/26378579/",
                    id: "26378579"
                },
                {
                    rating: {
                        max: 10,
                        average: 6.1,
                        stars: "30",
                        min: 0
                    },
                    genres: [
                        "剧情"
                    ],
                    title: "时间去哪儿了",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1380632/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1504654064.95.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1504654064.95.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1504654064.95.jpg"
                            },
                            name: "梅芙·金琴丝",
                            id: "1380632"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1005985/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1448114660.11.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1448114660.11.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1448114660.11.jpg"
                            },
                            name: "赵涛",
                            id: "1005985"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1380635/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1507603829.55.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1507603829.55.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1507603829.55.jpg"
                            },
                            name: "迪萨·恩杜纳",
                            id: "1380635"
                        }
                    ],
                    collect_count: 1207,
                    original_title: "时间去哪儿了",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1274261/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/38530.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/38530.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/38530.jpg"
                            },
                            name: "贾樟柯",
                            id: "1274261"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1000292/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/3107.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/3107.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/3107.jpg"
                            },
                            name: "沃尔特·塞勒斯",
                            id: "1000292"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1050375/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1504653776.78.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1504653776.78.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1504653776.78.jpg"
                            },
                            name: "马德哈尔·班达卡",
                            id: "1050375"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1336526/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1504653819.82.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1504653819.82.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1504653819.82.jpg"
                            },
                            name: "贾梅尔·奎比卡",
                            id: "1336526"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1309311/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/41837.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/41837.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/41837.jpg"
                            },
                            name: "阿历斯基·费朵奇科",
                            id: "1309311"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2501484690.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2501484690.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2501484690.webp"
                    },
                    alt: "https://movie.douban.com/subject/27025637/",
                    id: "27025637"
                },
                {
                    rating: {
                        max: 10,
                        average: 7.3,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "爱情",
                        "奇幻"
                    ],
                    title: "蝴蝶公墓",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1316159/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1410932412.39.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1410932412.39.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1410932412.39.jpg"
                            },
                            name: "张俪",
                            id: "1316159"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1319584/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1392196292.93.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1392196292.93.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1392196292.93.jpg"
                            },
                            name: "锦荣",
                            id: "1319584"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1326498/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/gnpl8y0Pwcel_avatar_uploaded1359153339.69.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/gnpl8y0Pwcel_avatar_uploaded1359153339.69.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/gnpl8y0Pwcel_avatar_uploaded1359153339.69.jpg"
                            },
                            name: "李子峰",
                            id: "1326498"
                        }
                    ],
                    collect_count: 62,
                    original_title: "蝴蝶公墓",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1290574/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/21289.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/21289.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/21289.jpg"
                            },
                            name: "马伟豪",
                            id: "1290574"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2501918168.webp",
                        large: "https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2501918168.webp",
                        medium: "https://img1.doubanio.com/view/movie_poster_cover/spst/public/p2501918168.webp"
                    },
                    alt: "https://movie.douban.com/subject/26289125/",
                    id: "26289125"
                },
                {
                    rating: {
                        max: 10,
                        average: 7.3,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "剧情",
                        "喜剧"
                    ],
                    title: "坑爹游戏",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1274307/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1504169127.76.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1504169127.76.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1504169127.76.jpg"
                            },
                            name: "于谦",
                            id: "1274307"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1324187/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1504169435.56.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1504169435.56.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1504169435.56.jpg"
                            },
                            name: "黄一琳",
                            id: "1324187"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1275869/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1360094483.49.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1360094483.49.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1360094483.49.jpg"
                            },
                            name: "汪东城",
                            id: "1275869"
                        }
                    ],
                    collect_count: 19,
                    original_title: "坑爹游戏",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1382823/",
                            avatars: {
                                small: "https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png",
                                large: "https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png",
                                medium: "https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png"
                            },
                            name: "米宝",
                            id: "1382823"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2501486910.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2501486910.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2501486910.webp"
                    },
                    alt: "https://movie.douban.com/subject/26914824/",
                    id: "26914824"
                },
                {
                    rating: {
                        max: 10,
                        average: 7.3,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "喜剧",
                        "奇幻"
                    ],
                    title: "羞羞的铁拳",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1350408/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1437031126.82.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1437031126.82.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1437031126.82.jpg"
                            },
                            name: "艾伦",
                            id: "1350408"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1319032/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1444800807.11.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1444800807.11.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1444800807.11.jpg"
                            },
                            name: "马丽",
                            id: "1319032"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1325700/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1356510694.28.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1356510694.28.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1356510694.28.jpg"
                            },
                            name: "沈腾",
                            id: "1325700"
                        }
                    ],
                    collect_count: 188476,
                    original_title: "羞羞的铁拳",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1350407/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1437031175.04.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1437031175.04.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1437031175.04.jpg"
                            },
                            name: "宋阳",
                            id: "1350407"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1381643/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1508159049.11.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1508159049.11.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1508159049.11.jpg"
                            },
                            name: "张吃鱼",
                            id: "1381643"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2499793218.webp",
                        large: "https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2499793218.webp",
                        medium: "https://img1.doubanio.com/view/movie_poster_cover/spst/public/p2499793218.webp"
                    },
                    alt: "https://movie.douban.com/subject/27038183/",
                    id: "27038183"
                },
                {
                    rating: {
                        max: 10,
                        average: 8.3,
                        stars: "45",
                        min: 0
                    },
                    genres: [
                        "剧情",
                        "喜剧",
                        "犯罪"
                    ],
                    title: "天才枪手",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1378772/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1502329358.43.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1502329358.43.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1502329358.43.jpg"
                            },
                            name: "茱蒂蒙·琼查容苏因",
                            id: "1378772"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1366471/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1501641938.73.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1501641938.73.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1501641938.73.jpg"
                            },
                            name: "查侬·散顶腾古",
                            id: "1366471"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1378774/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1508172602.27.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1508172602.27.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1508172602.27.jpg"
                            },
                            name: "依莎亚·贺苏汪",
                            id: "1378774"
                        }
                    ],
                    collect_count: 92064,
                    original_title: "ฉลาดเกมส์โกง",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1331673/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1502329251.58.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1502329251.58.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1502329251.58.jpg"
                            },
                            name: "纳塔吾·彭皮里亚",
                            id: "1331673"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2501863104.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2501863104.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2501863104.webp"
                    },
                    alt: "https://movie.douban.com/subject/27024903/",
                    id: "27024903"
                },
                {
                    rating: {
                        max: 10,
                        average: 7,
                        stars: "35",
                        min: 0
                    },
                    genres: [
                        "喜剧",
                        "音乐"
                    ],
                    title: "缝纫机乐队",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1324043/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1490342249.11.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1490342249.11.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1490342249.11.jpg"
                            },
                            name: "大鹏",
                            id: "1324043"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1316368/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1473410979.5.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1473410979.5.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1473410979.5.jpg"
                            },
                            name: "乔杉",
                            id: "1316368"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1315729/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1441515551.6.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1441515551.6.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1441515551.6.jpg"
                            },
                            name: "古力娜扎",
                            id: "1315729"
                        }
                    ],
                    collect_count: 49536,
                    original_title: "缝纫机乐队",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1324043/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1490342249.11.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1490342249.11.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1490342249.11.jpg"
                            },
                            name: "大鹏",
                            id: "1324043"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2498558511.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2498558511.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2498558511.webp"
                    },
                    alt: "https://movie.douban.com/subject/26926321/",
                    id: "26926321"
                },
                {
                    rating: {
                        max: 10,
                        average: 7.5,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "动作",
                        "犯罪"
                    ],
                    title: "追龙",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1025194/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/10695.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/10695.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/10695.jpg"
                            },
                            name: "甄子丹",
                            id: "1025194"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1054424/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1378956633.91.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1378956633.91.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1378956633.91.jpg"
                            },
                            name: "刘德华",
                            id: "1054424"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1317884/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1488637169.38.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1488637169.38.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1488637169.38.jpg"
                            },
                            name: "姜皓文",
                            id: "1317884"
                        }
                    ],
                    collect_count: 60111,
                    original_title: "追龍",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1274331/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/3237.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/3237.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/3237.jpg"
                            },
                            name: "王晶",
                            id: "1274331"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1318237/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/1475727461.38.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/1475727461.38.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/1475727461.38.jpg"
                            },
                            name: "关智耀",
                            id: "1318237"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2499052494.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2499052494.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2499052494.webp"
                    },
                    alt: "https://movie.douban.com/subject/26425068/",
                    id: "26425068"
                },
                {
                    rating: {
                        max: 10,
                        average: 7.3,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "动作",
                        "惊悚"
                    ],
                    title: "英伦对决",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1054531/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/694.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/694.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/694.jpg"
                            },
                            name: "成龙",
                            id: "1054531"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1031219/",
                            avatars: {
                                small: "https://img1.doubanio.com/img/celebrity/small/50837.jpg",
                                large: "https://img1.doubanio.com/img/celebrity/large/50837.jpg",
                                medium: "https://img1.doubanio.com/img/celebrity/medium/50837.jpg"
                            },
                            name: "皮尔斯·布鲁斯南",
                            id: "1031219"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1011562/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1415689928.93.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1415689928.93.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1415689928.93.jpg"
                            },
                            name: "刘涛",
                            id: "1011562"
                        }
                    ],
                    collect_count: 50128,
                    original_title: "The Foreigner",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1040630/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/10682.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/10682.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/10682.jpg"
                            },
                            name: "马丁·坎贝尔",
                            id: "1040630"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2499135561.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2499135561.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2499135561.webp"
                    },
                    alt: "https://movie.douban.com/subject/25723583/",
                    id: "25723583"
                },
                {
                    rating: {
                        max: 10,
                        average: 7.3,
                        stars: "40",
                        min: 0
                    },
                    genres: [
                        "动作",
                        "科幻",
                        "灾难"
                    ],
                    title: "全球风暴",
                    casts: [
                        {
                            alt: "https://movie.douban.com/celebrity/1040500/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/4940.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/4940.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/4940.jpg"
                            },
                            name: "杰拉德·巴特勒",
                            id: "1040500"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1053559/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/28071.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/28071.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/28071.jpg"
                            },
                            name: "吉姆·斯特吉斯",
                            id: "1053559"
                        },
                        {
                            alt: "https://movie.douban.com/celebrity/1040985/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/20016.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/20016.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/20016.jpg"
                            },
                            name: "艾比·考尼什",
                            id: "1040985"
                        }
                    ],
                    collect_count: 287,
                    original_title: "Geostorm",
                    subtype: "movie",
                    directors: [
                        {
                            alt: "https://movie.douban.com/celebrity/1050031/",
                            avatars: {
                                small: "https://img3.doubanio.com/img/celebrity/small/1390371397.56.jpg",
                                large: "https://img3.doubanio.com/img/celebrity/large/1390371397.56.jpg",
                                medium: "https://img3.doubanio.com/img/celebrity/medium/1390371397.56.jpg"
                            },
                            name: "迪安·德夫林",
                            id: "1050031"
                        }
                    ],
                    year: "2017",
                    images: {
                        small: "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2501769525.webp",
                        large: "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2501769525.webp",
                        medium: "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2501769525.webp"
                    },
                    alt: "https://movie.douban.com/subject/22266012/",
                    id: "22266012"
                }
            ]
        }
        this.movieInTheaters.subjects.forEach(subject => {
            subject.rating.stars = Number(subject.rating.stars) / 10;
        });

    }

}
