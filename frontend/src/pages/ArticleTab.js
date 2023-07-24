import React from "react";
import '../styles/articleTab.css';
import Collapsible from 'react-collapsible'; //Documentation: https://www.npmjs.com/package/react-collapsible

function ArticleTab() {
    return (
        <div className="article">
            <h1>Major/Class Planning as a Pre-Med at UCLA</h1>
            <h4 style={{ "marginTop": "0" }}>By Phillip Ma</h4>
            <p>Getting started as a pre-med at UCLA can be very daunting, especially without any guidance. There are multiple facets to consider when being pre-med, including what to major in, what classes to take, when to take the MCAT, what extracurricular experience to have, and more.</p>
            <p>As a 3rd year Physiological Science Major, I’d love to give you the advice I wish I had as a new pre-med. There’s a surprising amount of tips that are important to know when it comes to planning classes and choosing a major which I only found out about from upperclassmen. After you read this guide, I am confident that you will have a better idea of how to plan your 4 years. Without further ado, let's first get into choosing a major.</p>
            <div className="subArticles">
                <Collapsible trigger="Deciding a Major">
                    <p>
                        Choosing the right major determines what upper-division classes you decide to take in the future (lower-division classes are introductory classes while upper-division classes are specific to your major). It may seem like a super pressing issue that you need to decide immediately so you can start making your 4-year plan and graduate on time.
                    </p>
                    <p>
                        But honestly, it’s not as big of a deal as you think (at least for your first 2 years).
                    </p>
                    <p>The truth is that you can choose whatever major you like. However, I will say that the majority of pre-med students end up choosing a major in the life sciences for multiple reasons. First, medical schools have a requirement for the classes you need to take, including 1 year of biology with lab, 1 year of general chemistry with lab, 1 year of organic chemistry with lab, 1 course of biochemistry, 1 year of mathematics, 1 year of physics with lab, and 1 year of college-level english/writing. These requirements happen to overlap highly with the life science major, and I’ll detail the classes you need later for medical school as a life science major. So make sure you choose a major you’re interested in, but also one that overlaps with the requirements of medical school (the more overlap you have, the easier of a time you will have). </p>
                    <p>Another note about life science majors specifically is that it’s really easy to switch within the life science department because a lot of the lower-division classes are overlapping. For example, I was originally a psychobiology major but ended up switching to physiological science during my fall quarter of sophomore year. Because so many of the lower-division classes overlapped, the only extra class I took was Psych 10. So, it’s not pressing that you have to decide what major you intend on graduating with. As long as you are within the same department, the switch should be very easy. Majors only really impact you when you begin to take upper-division classes (junior and senior year) in which you’ll be taking classes that only count towards that major for graduation. So, take this opportunity to try the lower-division classes and see what interests you before you decide on your major! Here are my general *biased* notes on the life science majors I considered. </p>
                    <h3>Psychobiology</h3>
                    <p>Learn about psychology, known for being the “easy” pre-med major. One con is that the upper-division classes don’t count as STEM classes and that means you can’t ask those professors for a letter of recommendations for the science recommendation (you need 2).</p>
                    <h3>Molecular, Cell, and Developmental Biology</h3>
                    <p>Good for people who like research. A lot about DNA and experimental techniques. For upper-division elective classes your research lab can count for units. The major doesn’t seem too hard either.</p>
                    <h3>Microbiology, Immunology, and Molecular Genetics</h3>
                    <p>Revolves around designing experiments and interpreting them, a lot of time spent in research. However, it is also known to be a GPA killer. You can apply for Path 2, which allows you to do research with a faculty mentor.</p>
                    <h3>Physiological Science</h3>
                    <p>Known to be a difficult major because of the amount of content in each class, but also people who are in this major love it. There is a cadaver lab which is super cool, a lot of the classes are memorization. You will learn a lot about the human body and systems. I was convinced to switch into this major because I took Life Science 7C (Physiology and Human Biology) and loved it.</p>
                    <h3>Human Biology and Society</h3>
                    <p>You have to apply into the major Spring of your sophomore year (as long as you do any community service work you will probably get it). Many people go into this major because they are interested in public health and exploring different aspects of healthcare. One great thing about the major is that you can take a broad range of upper-division electives depending on the concentration you choose. You can take a lot of humanity classes through this major.</p>
                    <br></br>
                    <p>In general, to get a feel for the major you want, look at the core upper-division classes for each major and see if you are interested in the classes (also find out how difficult the classes are).
                    </p>
                </Collapsible>
                <Collapsible trigger="Planning Classes">
                    <p>
                        Planning your classes in advance is really important and you should begin to make a generalized plan within your first quarter at UCLA. This is because there are so many random General Education requirements in addition to major-related classes that you need to take in order to graduate. Moreso, a couple of the classes are <strong>really</strong> difficult to get, which means you need to plan early so that you can get the classes you need. Below I will detail the courses needed for medical school as a life science major (if you’re not a life science major you can still look at these courses, just substitute the math and chemistry courses depending on what you need).
                    </p>
                    <ul>
                        <li>One Year of Biology with Lab: Life Sci 7A, Life Sci 7B, Life Sci 7C, Life Sci 23L </li>
                        <li>One Year of General Chemistry with Lab: Chem 14A, Chem 14B, Chem 14BL</li>
                        <li>One Year of Organic Chemistry with Lab: Chem 14C, Chem 14D, Chem 14CL</li>
                        <li>One Course of Biochemistry: Chem 153A</li>
                        <li>One Year of Math: LS 30A, LS 30B, Stats 13 (can also take other math series, but those are harder)</li>
                        <li>One Year of Physics with Lab: Physics 5A, Physics 5B, Physics 5C</li>
                        <li>One Year of College-Level English/Writing: 3 Writing II classes or English or Comp Lit</li>
                    </ul>
                    <br></br>
                    <p>These are the classes you need for <strong>medical school</strong>. Of course your major will have many more classes you need to take, but make sure to fit these classes in at one point before/while applying to medical school. </p>
                    <p>Now I am going to speak about individual classes in terms of their difficulty so you can space the difficult classes into separate quarters.</p>
                    <h3>Easy Classes (I studied very minimally)</h3>
                    <h4>LS 30A, LS 30B </h4>
                    <p>They teach you how to take a derivative and my professors also provided a lot of extra credit. If you took AP Calc AB in high school you should be set for this class. </p>
                    <h4>Stats 13</h4>
                    <p>I took AP stats in high school and it was literally the same thing.</p>

                    <h3>Medium Classes (I studied quite a bit, but the content wasn’t too bad)</h3>
                    <h4>Chem 14A and Chem 14B</h4>
                    <p>Keep in mind I took AP Chemistry in high school. These classes were very similar to AP Chemistry and I definitely spent a lot of time studying for these classes. Make sure to do the additional practice problems!! And look for old exams.</p>
                    <h4>Chem 14C</h4>
                    <p>This is the first organic chemistry class so there may be a learning curve in terms of understanding the content. For the life science department, UCLA splits chemistry into Chem 14C and Chem 14D. Chem 14D is a really difficult class with a lot of memorization and application while Chem 14C is more about understanding the basics.</p>
                    <h4>LS 7A, LS 7B</h4>
                    <p>These biology courses are very similar to AP Biology. LS 7B was easier than LS 7A as 7B was on evolution while 7A was on cell and molecular biology. You didn’t really have to memorize anything for these classes and it was more about application. For example, for cycles that you would normally have to memorize (like citric acid cycle), they give you the diagram on the exam.</p>

                    <h3>Difficult Classes (you will need to dedicate a lot of time, split them into separate quarters):</h3>
                    <h4>Life Sci 7C</h4>
                    <p>This is a difficult class that covers many human systems. A lot of it is applying what you’ve learned rather than just memorizing, which makes the class even harder. </p>
                    <h4>Chem 14D</h4>
                    <p>The second class for Organic Chemistry. There are a lot of reactions and mechanisms you have to learn for this class. At one point I had to remember 20 unique reactions for a lecture. The class really speeds up during the second half so make sure to constantly study. Also looking for old practice exams is the way to go.</p>
                    <h4>Chem 153A</h4>
                    <p>Biochemistry! This class only says 4 units but don’t be fooled. This is a full ass investment. Lectures run M,T,W,F and are 50 minutes each. I remember studying an additional 1.5-2 hours for each lecture. This class really should’ve been split into 2 classes. There is a lot of memorization, so be prepared to study a lot. Ideally take this right before you start studying for the MCAT so that you don’t have to do too much re-learning for the MCAT.</p>
                    <p>Note: Even though these are hard classes these were also my favorite because I feel like I learned the most in these classes. GET PUMPED!</p>

                    <h3>Miscellaneous</h3>
                    <h4>Physics 5A, 5B, and 5C</h4>
                    <p>The physics series will be easy or difficult depending on your background in physics. I took AP Physics 1 and AP Physics C: Mechanics in high school so Physics 5A, which basically covers Physics 1, was very manageable for me. However, if I was learning physics for the first time, I would’ve had to devote a lot more time to the class. These classes are very formula heavy and conceptual rather than math heavy. You basically don’t need to know calculus for this series.</p>

                    <br></br>
                    <p>So when should you take these classes? I recommend you plan to finish the biology, chemistry, physics, and math series before the end of your sophomore summer (excluding lab classes) because these are the classes you need for the MCAT. If you don’t want to take a gap year as a pre-med, that means you are going to apply for medical school in the spring of your junior year. You have to have taken your MCAT before then. Many of my friends who do not take gap years study for the MCAT during the summer between their 2nd and 3rd year and then take the exam sometime before May (which is when you start applying to medical schools through the AMCAS). This means they finish these classes by the end of their sophomore year. These are the classes you should aim to complete before the end of your second year:</p>

                    <ul>
                        <li>Chem 14A, Chem 14B, Chem 14C, Chem 14D</li>
                        <li>LS 7A, LS 7B, LS 7C</li>
                        <li>Physics 5A, Physics 5B, Physics 5C</li>
                        <li>LS 30A, LS 30B</li>
                        <li>Psych 10 (optional)</li>
                    </ul>

                    <p>Even if you plan to take a gap year, it’s always nice to get these lower-division classes out of the way so you have more options available to you (whether you want to suddenly take the MCAT sooner or if you decide to switch to another healthcare path, it’ll be easier). Additionally, since you’ll need to remember the information in these classes, taking them all together will make MCAT studying easier. Many people take the MCAT sophomore summer and still end up taking multiple gap years.</p>
                    <p>Also remember that many of these classes have prerequisites (for example, in order to take Chem 14B you need to take Chem 14A), meaning that you need to space out your classes correctly and start on different subject classes sooner. For example if you want to finish Chem 14A, 14B, 14C, and 14D within your first 2 years, you have to take Chemistry in 4 out of your first 6 quarters at UCLA (assuming you don’t take summer classes).</p>
                    <p>Here is a <a href="https://docs.google.com/spreadsheets/d/1gV4iaRFJmfOkEy6pyqrQ_QpSdPBJDkvSatM0HKMMmDk/edit#gid=552138629" target="_blank" rel="noreferrer" style={{ "textDecoration": "underline" }}>link to my class-planning spreadsheet.</a> Feel free to make a copy of it and add your own classes. Note that I started my Chem and Bio series quite early. This was important so that I could get started on those series.</p>
                    <p>When enrolling in classes each quarter, I always end up editing my schedule because it’s really hard to get the classes you want. I’ll note that the physics series is really hard to get in particular. I only got Physics 5A so early because I took it during the summer. Otherwise, the classes will be really hard to get. But if you don’t get it, it’s ok, nothing you can do about it. That’s just a con of going to such a large school.</p>
                    <p>Some classes you can get away with not taking before studying for the MCAT because you can just self-study it. I’ve heard that for the Physics series it’s manageable to self-study. Meanwhile, topics like biochemistry are really hard to self-study.</p>
                    <p>One strategy a lot of students do is they have their upperclassmen friends, who have better enrollment times, hold classes for them. As long as the class doesn’t have a waitlist and they haven’t taken the class yet, you can get the class held.</p>
                    <p>A note about GEs: Load up your Degree Audit Report and see which ones you need to do! Honestly the most important thing about GEs is the bruinwalk professor rating. If the professor is good, you’ll probably have a good time.</p>
                </Collapsible>
                <Collapsible trigger="So What Happens Now?">
                    <p>Now that you have a better idea of how to plan your 4 years, I want to remind you that nothing is set in stone. You may think you want to be pre-med now and decide you want to explore other things. For example, during my sophomore winter, I decided to take CS 31 (Introduction to Computer Science I) because I wanted to learn how to code (it didn’t even go towards my major rip). I also meticulously planned all my classes these past 2 years thinking I needed to take the MCAT this summer, just to not take it because I want time to explore other careers. So, take all this class planning stuff seriously, but don’t stress about it. That’s the whole point of this website, which is to help you explore career paths and connect meaningfully with upperclassmen. Anyway, go forth, I hope I helped you today!</p>
                </Collapsible>
            </div>

        </div>
    );
}

export default React.memo(ArticleTab);