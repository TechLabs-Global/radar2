INSERT INTO locations (name, address, url, type)
VALUES (
        'KoFabrik in Bochum',
        'Stühmeyerstraße 33, 44787 Bochum',
        'https://maps.app.goo.gl/e3wjUvQmCFNY3GT47',
        'offline'
    );

INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('203edc8e-4c3c-449f-a71a-545d8689965a', 'Hatching Phase', '2024-05-12 19:00:00 +02:00', 'You should have finished at least **8h** of your track until the deadline. __This is a cutting point__: if you fail to complete it, you cannot participate any longer.', 'cutoff', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('06417a60-f6f1-4f31-b3da-2e37cc7d0787', 'Semester Kick-Off Winterterm 23/24', '2024-04-27 19:00:00 +02:00', 'This is where your Digital Shaper Journey will start. We''ll give you a summary on all you need to know to master your track.
Our topics include:

1. **Key Facts** regarding TechLabs, the Digital Shaper program, certificate and community
2. **Administrative Topics** – your onboarding to our toolset, communication channels, regular meetings & next steps
3. **Track Get-Together** – you''ll meet other participants in the track you''re planning to choose, and can ask the Track Leads for more information

Our goal is for everybody to have a clear understanding about TechLabs Dortmund and your Journey!', 'event', FALSE, TRUE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('0bcab313-78ee-4962-bd90-726172445f91', '50% Checkpoint', '2024-06-04 19:00:00 +02:00', 'You should aim to have completed around __50%__ of your learning material by this date. This is __not__ a cutting point, only a general recommendation to help you pace your studies.', 'checkpoint', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('5ecb9a56-9e68-43b2-82a5-975bef243008', 'Open Track Q&A', '2024-04-30 19:00:00 +02:00', 'Are you lost or do you have questions regarding your track? We''ve got you covered! Join us for an open Q&A session where you can ask all your questions and get help from our mentors.', 'event', FALSE, FALSE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('3ab545a0-4ae5-4629-9c76-e21ec08af017', 'Meet&Eat', '2024-05-09 19:00:00 +02:00', 'One of the most important aspects of the Digital Shaper Program is the community. So we want to give you a platform to connect.

This is why this event is all about getting to know each other in a ''Meet&Eat'' manner. You will have several chats with other participants, talking about different topics e.g. hobbies and personal interests.
We are looking forward to you getting to know each other a little bit more and having a fun time together.', 'event', FALSE, FALSE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('45502df1-e8c0-483d-ad98-be93f71b9c47', '70% Checkpoint', '2024-07-09 19:00:00 +02:00', 'By now, you should have completed the minimum required __70%__ of your learning material. __This is a cutting point__ = if you fail to do so, you cannot participate any longer.

__DS__ - min. 55h
__DL__ - min. 40h
__UX__ - min. 40h
__WD__ - min. 30h', 'cutoff', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('8fd5a2c9-8f94-4f0c-80eb-54907c38ba27', 'Social Networking Event', '2024-05-24 19:00:00 +02:00', 'This is why this event is all about getting to know each other. You will have several chats with other participants, talking about different topics e.g. hobbies and personal interests.
We are looking forward to you getting to know each other a little bit more and having a fun time together.', 'event', FALSE, FALSE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('2cb65163-e9b7-4750-8cb6-46f69efe4e9c', 'Project Phase Deep-Dive', '2024-06-07 19:00:00 +02:00', 'This is a mandatory event!

With the project phase getting closer we want to give you a more in-depth overview over the upcoming weeks.

We will talk about the general outline and we will provide you with all the necessary knowledge and information you will to complete your project.
You will also get the chance to brainstorm for possible project ideas.', 'event', FALSE, TRUE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('73485c48-f651-4b33-b489-2283190a173a', 'Introduction to GitHub & Setup Workshop', '2024-07-23 19:00:00 +02:00', 'The time of sharing files with a version inside its name is over – no more Project_v1.txt, Project_v2.txt, Project_v3.txt!

In this session we want to prepare you for the project phase and show you how to work efficiently in a team. We will introduce you to GitHub, a platform for version control and collaboration. We will show you how to create a repository, how to work with branches, and how to merge your changes into the main branch.

In addition to GitHub we also want to use this event as a ''Setup-Workshop'' for the project phase. We will help you to set up your development environment and be there to answer all your questions.

The event will be held online as it is way easier to share screens', 'event', FALSE, FALSE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('b1670758-44f7-4f3c-a30e-13be09eec3eb', 'Ideation Workshop - Online Version', '2024-07-02 19:00:00 +02:00', 'This is the replacement event for the in-ersion of the Ideation Workshop.

You only need to join this event if you haven''t joined the in-person version of the Ideation Workshop.', 'event', FALSE, FALSE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('1be6a525-a5e3-40b8-b866-1ff5397856d3', 'Ideation Workshop', '2024-06-22 19:00:00 +02:00', 'This is a mandatory event!

We will foster your creativity to imagine project ideas based on real-world problems and further continue working on the brainstormed project ideas from the Project Phase DeepDive.

You will be able to learn about and participate in ideation methods from the Design Thinking Space.
Of course this will be guided by TechLabs Dortmund team members and Design Thinking Experts!', 'event', FALSE, TRUE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('79cbed05-b084-4cec-ba53-b661361cc4e2', 'Regular Project Update #1', '2024-08-04 19:00:00 +02:00', 'You should update us regularly about your current progress, challenges and issues you are facing. This helps us to guide you into the right direction - if necessary - and it helps you to reflect on all of your accomplishments so far.

To do so, please set up a meeting with your Journey Project Manager and provide him/her with a short summary of what you''ve been doing.', 'checkpoint', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('19fd1a4d-faf6-48e9-aeca-f118069bb37c', 'Project Kick-Off & Agile/Project Management Workshop', '2024-07-20 19:00:00 +02:00', 'On this event we will officially kick-off the project phase. It will include updates about the Transition Period, updates from all teams, and some pointers about project management.

We will also have a workshop about agile and project management, which will give you the necessary knowledge to successfully manage your project during the project phase.
The workshop is a hands-on training session that introduces you to Agile development methodologies, promoting collaboration and adaptability in a concise and interactive format.', 'event', FALSE, TRUE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('b3c4595a-00c7-4106-bffa-cc2836852050', 'Regular Project Update #2', '2024-08-25 19:00:00 +02:00', 'You should update us regularly about your current progress, challenges and issues you are facing. This helps us to guide you into the right direction - if necessary - and it helps you to reflect on all of your accomplishments so far.

To do so, please set up a meeting with your Journey Project Manager and provide him/her with a short summary of what you''ve been doing.', 'checkpoint', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('49841bfb-a444-4acb-a54f-49b6452972a7', 'Midterm Project Pitches', '2024-08-30 19:00:00 +02:00', 'Every team should give a short project presentation pitch of the current progress, issues you have faced so far and the future goals and tasks.

The goal is to help you get a better overview of other projects, get some inspiration and guidance and to help each other out with potential issues.', 'event', FALSE, TRUE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('02a806d5-5d70-4d94-8383-18697bb3124d', 'Regular Project Update #3', '2024-09-15 19:00:00 +02:00', 'You should update us regularly about your current progress, challenges and issues you are facing. This helps us to guide you into the right direction - if necessary - and it helps you to reflect on all of your accomplishments so far.

To do so, please set up a meeting with your Journey Project Manager and provide him/her with a short summary of what you''ve been doing.', 'checkpoint', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('aa05e43b-f7f4-4c1c-8f30-675abdb0d410', 'Regular Project Update #4', '2024-10-06 19:00:00 +02:00', 'You should update us regularly about your current progress, challenges and issues you are facing. This helps us to guide you into the right direction - if necessary - and it helps you to reflect on all of your accomplishments so far.

To do so, please set up a meeting with your Journey Project Manager and provide him/her with a short summary of what you''ve been doing.', 'checkpoint', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('c70edc3f-46b7-453a-b661-60313263d808', 'Project Submission', '2024-10-13 19:00:00 +02:00', 'You did some nice work and now is the time to show it off! After you''ve
finished your project, you will officially submit your project and the respective blog post to us
for review.

In addition, we would like you to submit all of your progress to the respective **GitHub repository** along with a *README* which outlines
what steps are needed to operate the prototype. Please include the required **Blog Post** and a **Short Project Description** as files in the repository as well.

The Project Submission Form must be submitted **once per project team**.', 'cutoff', TRUE, FALSE, NULL);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('2174e552-da5d-4359-ad5e-731505526262', 'Data Science & Backend', '2024-08-08 19:00:00 +02:00', 'We will give you an introduction on how to connect your Data Science insights to your backend as well as connecting your backend to your frontend. Learn the basics of FastAPI in Python.', 'event', FALSE, FALSE, 1);


INSERT INTO events (id, title, event_date, description, type, is_public, is_mandatory, location_id)
VALUES ('667be393-7c38-400f-98eb-e1f3189efd17', 'Project Pitches & Closing Ceremony', '2024-10-18 19:00:00 +02:00', 'Unfortunately, all good things have to come to an end. This event will be the closing event of our journey, focusing on what you have achieved over the past months!

We will also have a little closing ceremony, announce a winner and inform you about the next steps to receive your Digital Shaper Certificate!', 'event', FALSE, TRUE, 1);


-- PHASES

INSERT INTO phases (title, description, date_from, date_to)
VALUES ('Onboarding Phase', 'You join the community and get access to our learning platform edyoucated. We present our four tracks, you choose one and create your personal TechLabs journey based on your previous knowledge.', '2024-04-27 00:00:00 +02:00', '2024-04-28 00:00:00 +02:00');


INSERT INTO phases (title, description, date_from, date_to)
VALUES ('Academy Phase', 'You work through your track on edyoucated and become a master of your class. We organize social events regularly so that you can connect with fellow Techies, share your insights and work together on difficulties.', '2024-04-29 00:00:00 +02:00', '2024-07-19 00:00:00 +02:00');


INSERT INTO phases (title, description, date_from, date_to)
VALUES ('Project Phase', 'This is prime time! You imagine and implement a prototype in a project of your own. You team up as a group of about 5 Techies and work together to create something big. Experienced mentors will be on your side for support.', '2024-07-20 00:00:00 +02:00', '2024-10-13 00:00:00 +02:00');


INSERT INTO phases (title, description, date_from, date_to)
VALUES ('Closing Week', 'You finish up your prototype and submit the final result to us. We organize a closing ceremony where you will pitch your final results.', '2024-10-14 00:00:00 +02:00', '2024-10-18 00:00:00 +02:00');


-- CONFIG

INSERT INTO config VALUES ('location.name', 'Düsseldorf');
INSERT INTO config VALUES ('location.logo', 'logo-duesseldorf.svg');
INSERT INTO config VALUES ('term.title', 'Summer Term 2024');
INSERT INTO config VALUES ('term.batchNumber', '10');
INSERT INTO config VALUES ('term.startDate', '2024-04-27 00:00:00 +02:00');
INSERT INTO config VALUES ('term.firstWeek', '0');
