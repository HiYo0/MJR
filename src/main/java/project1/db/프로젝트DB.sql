drop database if exists mzr;
create database mzr;
use mzr;

drop table if exists member;
create table member(
	mno int unsigned auto_increment primary key,	# 회원식별번호
    mid varchar(12) not null unique,	# 회원 아이디
    mpw varchar(16) not null,	# 회원 비밀번호
    mname varchar(20) not null,	# 회원 이름
    memail varchar(30) not null unique,	# 회원 이메일
    mphone varchar(14) not null unique,	# 회원 전화번호
    mbirth varchar(8) not null, # 회원 생일
    msex boolean not null,	# 회원 성별
    maddress varchar(30) not null,# 회원 주소
    mdate datetime default now(),	# 회원가입 날짜
    mimg text,	# 회원 프로필사진
    mstate int default 0	# 회원 계정상태 (0=일반회원 , 1=정지회원 , 2=탈퇴 , 3=관리자)
    #	mcoupon		# 보유한 쿠폰
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
	bno int unsigned auto_increment primary key,	# 게시글 식별번호PK
    bname varchar(20) not null,						# 게시글 제목
    bcontent longtext,								# 게시글 내용(사진,글가능)
    bcount int default 0,							# 게시글 조회수
    bdate datetime default now(),					# 게시글 최초등록날짜
    mno int unsigned,								# 등록한 사람 회원번호
    categorya int not null,							# 카테고리 지역 (인덱스번호로 식별함)
    categoryb int default 0,						# 카테고리 메뉴유형 (인덱스번호로 식별함)
    foreign key(mno) references member(mno)		# 게시글 작성자  FK
);

drop table if exists reply;
create table reply(
	rpno int auto_increment primary key,			# 댓글번호
    rpcontent varchar(100) not null,	# 댓글내용
    rpdate datetime default now(),		# 댓글 최초등록일
    mno int unsigned,					# 댓글작성자 FK
    bno int unsigned,					# 게시글 식별번호 FK
    rpindex int unsigned default 0 not null,
    
    foreign key(mno) references member(mno),
    foreign key(bno) references board(bno)
);

drop table if exists store;
create table store(
	sno int unsigned auto_increment , 		# 가계 식별번호
    sname varchar(50) not null unique ,		#가계 이름
    sphone varchar(13) not null,	# 전화번호
    simg1 longtext not null, 		# 대표 이미지1
    simg2 longtext not null, 		# 이미지2
    simg3 longtext not null, 		# 이미지3
    simg4 longtext not null, 		# 이미지4
    sadress varchar(50) not null , 	# 가계주소
    scontent text not null, 	# 가계설명
    sstate int not null default 0,		# 가계상태 0: 등록대기상태 1: 등록된 가게 2: 맛집 3: 반려 상태
    # srevisit int not null default 0,	# 총재방문횟수
    snumber int not null unique, # 사업자 번호
	categorya int not null,							# 카테고리 지역 (인덱스번호로 식별함)
    categoryb int default 0,						# 카테고리 메뉴유형 (인덱스번호로 식별함)
    slat varchar(30) not null default 37.3218778,					# 가게 위치 경도
    slng varchar(30) not null default 126.8308848,                  # 가게 위치 위도
    
    mno int unsigned,		# FK
    
    primary key(sno),
    
	foreign key(mno) references member(mno)

);

drop table if exists review;
create table review(
	rvno int auto_increment,						# 리뷰 식별번호
    rvcontent text not null,		# 리뷰 내용
    rvdate datetime default now(),	# 리뷰 작성일자
    sno int unsigned,						# 가게번호
    mno int unsigned,						# 리뷰 작성자 번호
    
    primary key(rvno),
    
    foreign key(mno) references member(mno),
    
    foreign key(sno) references store(sno)
	
);