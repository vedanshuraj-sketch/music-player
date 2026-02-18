
CREATE TABLE SONGS(
id serial primary key,
title varchar(100),
image varchar(255),
audio varchar(255)
);

insert into songs(title, image, audio)
values('See You Again', 'sya.jpg', 'see-you-again.mp3'),
('Attenion', 'att.jpg', 'Attention.mp3'),
('Ramo Re', 'ramo.jpg', 'RAMO-RE.mp3'),
('Night Changes', 'nchanges', 'Night-Changes.mp3'),
('Woh Din', 'woh.jpg', 'Woh-Din.mp3');

update songs
set image = 'nchanges.jpg'
where title = 'Night Changes';

UPDATE songs
SET image = 'images/sya.jpg',
    audio = 'audio/see-you-again.mp3'
WHERE title = 'See You Again';

UPDATE songs
SET image = 'images/att.jpg',
    audio = 'audio/Attention.mp3'
WHERE title = 'Attenion';

UPDATE songs
SET image = 'images/ramo.jpg',
    audio = 'audio/RAMO-RE.mp3'
WHERE title = 'Ramo Re';

UPDATE songs
SET image = 'images/nchanges.jpg',
    audio = 'audio/Night-Changes.mp3'
WHERE title = 'Night Changes';

UPDATE songs
SET image = 'images/woh.jpg',
    audio = 'audio/Woh-Din.mp3'
WHERE title = 'Woh Din';

ALTER USER postgres WITH PASSWORD 'Ved@0304';

select * from songs;
delete from songs where id = 9;

insert into songs(title, image, audio)
values('I Like Me Better', 'images/ilmb.jpg', 'audio/I-Like-Me-Better.mp3');

insert into songs(title, image, audio)
values('Heat Waves', 'images/Heat-Waves.jpg', 'audio/Heat-Waves.mp3');

insert into songs(title, image, audio)
values('Shape of You', 'images/shape-of-you.jpg', 'audio/Shape-of-You.mp3'),
('Tera-Hone-Laga-Hoon', 'images/Tera-Hone-Laga-Hoon.jpg', 'audio/Tera-Hone-Laga-Hoon.mp3'),
('Tu-Haiye-Haali-Aave', 'images/Tu-Haiye-Haali-Aave.jpg', 'audio/Tu-Haiye-Haali-Aave.mp3'),
('Besabriyaan', 'images/Besabriyaan.jpg', 'audio/Besabriyaan.mp3'),
('Perfect', 'images/perfect.jpg', 'audio/Perfect.mp3'),
('We Dont Talk Anymore', 'images/we-dont-talk-anymore.jpg', 'audio/We-Dont-Talk-Anymore.mp3');