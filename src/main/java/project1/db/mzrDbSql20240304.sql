drop database if exists mzr;
create database mzr;
use mzr;

drop table if exists member;
create table member(
   mno int unsigned auto_increment primary key,   # 회원식별번호
    mid varchar(12) not null unique,   # 회원 아이디
    mpw varchar(16) not null,   # 회원 비밀번호
    mname varchar(20) not null,   # 회원 이름
    memail varchar(30) not null unique,   # 회원 이메일
    mphone varchar(14) not null unique,   # 회원 전화번호
    mbirth varchar(8) not null, # 회원 생일
    msex boolean not null,   # 회원 성별
    maddress varchar(30) not null,# 회원 주소
    mdate datetime default now(),   # 회원가입 날짜
    mimg text,   # 회원 프로필사진
    mstate int default 0   # 회원 계정상태 (0=일반회원 , 1=정지회원 , 2=탈퇴 , 3=관리자)
    #   mcoupon      # 보유한 쿠폰
);

insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('admin','admin','관리자','email', '010-0000-0000',00000000 , 0, '주소', null, 3);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('1id','1pw','1name','1email', '010-0000-0001',00000001 , 0, '주소1', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('2id','2pw','2name','2email', '010-0000-0002',00000002 , 0, '주소2', null, 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('3id','3pw','3name','3email', '010-0000-0003',00000003 , 0, '주소3', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('4id','4pw','4name','4email', '010-0000-0004',00000004 , 0, '주소4', null, 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('5id','5pw','5name','5email', '010-0000-0005',00000005 , 0, '주소5', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('6id','6pw','6name','6email', '010-0000-0006',00000006 , 0, '주소6', null, 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('7id','7pw','7name','7email', '010-0000-0007',00000007 , 0, '주소7', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('8id','8pw','8name','8email', '010-0000-0008',00000008 , 0, '주소8', null, 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('9id','9pw','9name','9email', '010-0000-0009',00000009 , 0, '주소9', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('10id','10pw','10name','10email', '010-0000-0010',00000010 , 1, '주소10', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('11id','11pw','11name','11email', '010-0000-0011',00000011 , 1, '주소11', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('12id','12pw','12name','12email', '010-0000-0012',00000012 , 1, '주소12', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('13id','13pw','13name','13email', '010-0000-0013',00000013 , 1, '주소13', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('14id','14pw','14name','14email', '010-0000-0014',00000014 , 1, '주소14', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('15id','15pw','15name','15email', '010-0000-0015',00000015 , 1, '주소15', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('16id','16pw','16name','16email', '010-0000-0016',00000016 , 1, '주소16', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('17id','17pw','17name','17email', '010-0000-0017',00000017 , 1, '주소17', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('18id','18pw','18name','18email', '010-0000-0018',00000018 , 1, '주소18', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('19id','19pw','19name','19email', '010-0000-0019',00000019 , 1, '주소19', null, 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mimg, mstate) values ('20id','20pw','20name','20email', '010-0000-0020',00000020 , 1, '주소20', null, 0);

drop table if exists board;
create table board(
   bno int unsigned auto_increment primary key,   # 게시글 식별번호PK
    bname varchar(20) not null,                  # 게시글 제목
    bcontent longtext,                        # 게시글 내용(사진,글가능)
    bcount int default 0,                     # 게시글 조회수
    bdate datetime default now(),               # 게시글 최초등록날짜
    mno int unsigned,                        # 등록한 사람 회원번호
    categorya int not null,                     # 카테고리 지역 (인덱스번호로 식별함)
    categoryb int default 0,                  # 카테고리 메뉴유형 (인덱스번호로 식별함)
    foreign key(mno) references member(mno)      # 게시글 작성자  FK
);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('1번글', '1번내용', 1, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('2번글', '2번내용', 1, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('3번글', '3번내용', 1, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('4번글', '4번내용', 2, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('5번글', '5번내용', 2, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('6번글', '6번내용', 2, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('7번글', '7번내용', 3, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('8번글', '8번내용', 3, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('9번글', '9번내용', 3, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('10번글', '10번내용', 4, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('11번글', '11번내용', 4, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('12번글', '12번내용', 4, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('13번글', '13번내용', 5, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('14번글', '14번내용', 5, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('15번글', '15번내용', 5, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('16번글', '16번내용', 6, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('17번글', '17번내용', 6, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('18번글', '18번내용', 6, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('19번글', '19번내용', 7, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('20번글', '20번내용', 7, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('21번글', '21번내용', 7, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('22번글', '22번내용', 8, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('23번글', '23번내용', 8, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('24번글', '24번내용', 8, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('25번글', '25번내용', 9, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('26번글', '26번내용', 9, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('27번글', '27번내용', 9, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('28번글', '28번내용', 10, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('29번글', '29번내용', 10, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('30번글', '30번내용', 10, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('31번글', '31번내용', 11, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('32번글', '32번내용', 11, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('33번글', '33번내용', 11, 1, 0);

drop table if exists reply;
create table reply(
   rpno int auto_increment primary key,         # 댓글번호
    rpcontent varchar(100) not null,   # 댓글내용
    rpdate datetime default now(),      # 댓글 최초등록일
    mno int unsigned,               # 댓글작성자 FK
    bno int unsigned,               # 게시글 식별번호 FK
    rpindex int unsigned default 0 not null,
    
    foreign key(mno) references member(mno),
    foreign key(bno) references board(bno)
);

insert into reply(rpcontent, mno, bno, rpindex) values('1번댓글', 1, 1, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('2번댓글', 1, 2, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('3번댓글', 1, 3, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('4번댓글', 2, 1, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('5번댓글', 2, 2, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('6번댓글', 2, 3, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('7번댓글', 3, 2, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('8번댓글', 3, 3, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('9번댓글', 3, 4, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('10번댓글', 4, 4, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('11번댓글', 4, 5, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('12번댓글', 4, 6, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('13번댓글', 5, 6, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('14번댓글', 5, 7, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('15번댓글', 5, 8, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('16번댓글', 6, 8, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('17번댓글', 6, 9, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('18번댓글', 6, 10, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('19번댓글', 7, 10, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('20번댓글', 7, 11, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('21번댓글', 7, 12, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('22번댓글', 8, 12, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('23번댓글', 8, 13, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('24번댓글', 8, 14, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('25번댓글', 9, 14, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('26번댓글', 9, 15, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('27번댓글', 9, 16, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('28번댓글', 10, 16, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('29번댓글', 10, 17, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('30번댓글', 10, 18, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('31번댓글', 11, 18, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('32번댓글', 11, 19, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('33번댓글', 11, 20, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('34번댓글', 12, 20, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('35번댓글', 12, 21, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('36번댓글', 12, 22, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('37번댓글', 13, 22, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('38번댓글', 13, 23, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('39번댓글', 13, 24, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('40번댓글', 14, 24, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('41번댓글', 14, 25, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('42번댓글', 14, 26, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('43번댓글', 15, 26, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('44번댓글', 15, 27, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('45번댓글', 15, 28, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('46번댓글', 16, 28, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('47번댓글', 16, 29, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('48번댓글', 16, 30, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('49번댓글', 17, 30, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('50번댓글', 17, 31, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('51번댓글', 17, 32, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('52번댓글', 18, 33, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('53번댓글', 18, 1, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('54번댓글', 18, 2, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('55번댓글', 19, 3, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('56번댓글', 19, 3, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('57번댓글', 19, 4, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('58번댓글', 20, 4, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('59번댓글', 20, 5, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('60번댓글', 20, 6, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('61번댓글', 21, 6, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('62번댓글', 21, 7, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('63번댓글', 21, 8, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('64번댓글', 2, 8, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('65번댓글', 2, 9, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('66번댓글', 2, 10, 0);





drop table if exists store;
create table store(
	sno int unsigned auto_increment ,       # 가계 식별번호
    sname varchar(50) not null unique ,      #가계 이름
    sphone varchar(13) not null,   # 전화번호
    simg1 longtext not null,       # 대표 이미지1
    simg2 longtext not null,       # 이미지2
    simg3 longtext not null,       # 이미지3
    simg4 longtext not null,       # 이미지4
    sadress varchar(50) not null ,    # 가계주소
    scontent text not null,    # 가계설명
    sstate int not null default 0,      # 가계상태 0: 등록대기상태 1: 등록된 가게 2: 맛집 3: 반려 상태
    # srevisit int not null default 0,   # 총재방문횟수
    snumber bigint unsigned not null unique, # 사업자 번호
   categorya int not null,                     # 카테고리 지역 (인덱스번호로 식별함)
    categoryb int default 0,                  # 카테고리 메뉴유형 (인덱스번호로 식별함)
    
    mno int unsigned,      # FK
    
    primary key(sno),
    
   foreign key(mno) references member(mno)
);

insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('1가게', '가게전화번호1', '1번img','2번img','3번img','4번img', '1번 주소', '1번가게내용', 0, 1111111111, 0, 1, 1);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('2가게', '가게전화번호2', '1번img','2번img','3번img','4번img', '2번 주소', '2번가게내용', 1, 2222222222, 1, 0, 2);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('3가게', '가게전화번호3', '1번img','2번img','3번img','4번img', '3번 주소', '3번가게내용', 0, 3333333333, 1, 1, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('4가게', '가게전화번호4', '1번img','2번img','3번img','4번img', '4번 주소', '4번가게내용', 1, 4444444444, 0, 1, 4);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('5가게', '가게전화번호5', '1번img','2번img','3번img','4번img', '5번 주소', '5번가게내용', 0, 5555555555, 1, 0, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('6가게', '가게전화번호6', '1번img','2번img','3번img','4번img', '6번 주소', '6번가게내용', 2, 6666666666, 1, 1, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, mno) values ('7가게', '가게전화번호7', '1번img','2번img','3번img','4번img', '7번 주소', '7번가게내용', 0, 7777777777, 0, 1, 6);


drop table if exists review;
create table review(
   rvno int auto_increment,                  # 리뷰 식별번호
    rvcontent text not null,      # 리뷰 내용
    rvdate datetime default now(),   # 리뷰 작성일자
    sno int unsigned,                  # 가게번호
    mno int unsigned,                  # 리뷰 작성자 번호
    
    primary key(rvno),
    
    foreign key(mno) references member(mno),
    
    foreign key(sno) references store(sno)
);

insert into review(rvcontent, sno, mno) values ('리뷰1내용', 1 , 7);
insert into review(rvcontent, sno, mno) values ('리뷰2내용', 1 , 8);
insert into review(rvcontent, sno, mno) values ('리뷰3내용', 1 , 9);
insert into review(rvcontent, sno, mno) values ('리뷰4내용', 1 , 10);
insert into review(rvcontent, sno, mno) values ('리뷰5내용', 1 , 11);
insert into review(rvcontent, sno, mno) values ('리뷰6내용', 1 , 7);
insert into review(rvcontent, sno, mno) values ('리뷰7내용', 1 , 7); -- 재방문

insert into review(rvcontent, sno, mno) values ('리뷰8내용', 2 , 10);
insert into review(rvcontent, sno, mno) values ('리뷰9내용', 3 , 10);  -- 재방문
insert into review(rvcontent, sno, mno) values ('리뷰10내용', 4 , 8);
insert into review(rvcontent, sno, mno) values ('리뷰11내용', 5 , 9);
insert into review(rvcontent, sno, mno) values ('리뷰12내용', 6 , 11);
insert into review(rvcontent, sno, mno) values ('리뷰13내용', 7 , 12);
insert into review(rvcontent, sno, mno) values ('리뷰14내용', 7 , 13);

select*from member;
select*from reply;
select*from store;
select*from review;