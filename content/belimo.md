# Belimo Assistant

## Executive Summary
### About the Project
A cross-platform app for HVAC setup, diagnostics, and management
across multiple devices and connection protocols.
### My Role
- Migrated design systems to Figma
- Designed user flows, wireframes, and interactive prototypes
- Collaborated closely with developers and QA .
### Challenges
Suppor ting three OSs, three device types, and seven connection
methods while ensuring consistent user flows and handling errors
effectively.

### Solutions
- Built a modern Figma-based design system with auto layout and
variables
- Automated error handling, reducing user-facing issues by 80%
- Created prototypes for real-device testing to eliminate guesswork.
### Results
- 2x faster design process
- Streamlined iterations with centralized collaboration in Figma
- Delivered a seamless user experience despite technical
complexity.

## What is it about

Imagine a technician in a service corridor, trying to configure a HVAC valve via smartphone. Belimo Assistant was made to solve these exact challenges - bringing efficiency to the hands of professionals around the world
It replaced three separate apps that were used for the same purpose. By connecting to Belimo devices via cable, internet, Bluetooth, or NFC, the app enables users to configure and monitor performance parameters, diagnose issues, and adjust settings directly from their PC, smartphone, or tablet.
Main objective was to quickly design and develop a multi-platform app that would enable commissioning and maintenance of Belimo products around the world, as the preceding apps have reached the end of life (and support).

## What did I do?
In the first half of the project I served as the sole designer, overseeing the entire design process and setting the foundation for a scalable design system. In the second half, two additional UX/UI designers joined the project.

### Migration to figma

Belimo used several different tools for design, handoff and documentation. In order to streamline process, we chose Figma as the single source of truth.

### Design System

Created a robust design system using brand guidelines and several existing components as a starting point. Also, assisted developers with implementation in Flutter.

### UX/UI Design

The whole “Design Thinking” process - research the users needs, define them, create ideas, prototype and finally test them.

### Cooperation with developers and QA

Adopting the new development framework while ensuring compatibility across a wide range of devices and connection types presented various challenges, which required close collaboration to successfully overcome.

## How did it all happen?
I started by understanding the project’s goals and audience. While there was plenty of documentation, stakeholder interviews proved to be the most insightful.

Early on, I noticed inefficiencies in design, handoff, and communication tools, so I streamlined them during the defining stage. Though we couldn’t track improvement as this team didn’t use the old approach, the job was done on time and everyone agreed that it was much faster way to cooperate.

In the ideation phase, we brainstormed app features, tackling challenges like complex connection methods and lengthy workflows on mobile. I simultaneously built a robust design system, enabling quick Figma prototypes with production-ready components. These examples eliminated guesswork during stakeholder meetings.

## Research
The primary users were Belimo employees and subcontractors, including HVAC setup, commissioning, and maintenance professionals. They were expert users, accustomed to technical workflows but often limited by environmental challenges. Given that stakeholders were highly knowledgeable about the product and its context, basic user flows were already outlined. I supplemented this with real-device testing to identify pain points and environmental challenges faced by users.

### Key Findings

#### Environmental constraints

HVAC professionals often operate in less-than-ideal environments (e.g., limited visibility, restricted physical access to devices).

#### Need for rapid iteration

Existing tools and processes were slowing down prototyping, testing and communication with stakeholders.

#### Interaction differences

Users had varying experiences depending on whether they were working with wired, Bluetooth, or NFC-connected devices.

## Problem
At the beginning of the project, the design toolkit was fragmented, with a handful of UI elements distributed across Adobe XD, Photoshop, and Illustrator files. Documentation was maintained in Confluence, and developer handoff was done in Zeplin while the comments were given in Jira. There was no prototyping during the design phase - UAT version of the app was used as a prototype. To achieve the desired speed and efficiency, we needed to streamline the workflow.

## Solution
I proposed Figma as the primary design tool and single source of truth, a suggestion quickly adopted not only for the Belimo Assistant but for all seven ongoing projects across three software vendors.

Leveraging design tokens and atomic design principles, I completed the remaining components and migrated the entire system to Figma. By utilising features like auto layout, nested components, component properties, and variables, I significantly improved design speed and efficiency. Close collaboration with the development team ensured consistent naming conventions, properties, and element hierarchy, streamlining implementation.

Centralising visuals, comments, and developer handoff in Figma enabled faster iterations and leaner communication while interactive prototypes on real devices reduced unnecessary development effort and improved the quality of UX work.

## Problem
With support for three operating systems across mobile, tablet, and PC, and seven different connection methods, users faced a range of potential errors during the connection process. While we aimed to minimize differences in user flows across platforms, this wasn’t always feasible. The primary challenge was the connection process itself - whether via internet, Bluetooth, USB cable, UTP cable, powered or unpowered NFC, or Bluetooth adapters. Each method had its own potential for failure or glitches during communication. Our goal was to reduce user frustration by ensuring seamless automatic reconnections and reliable data readout/write processes.

## Solution
Design for the “unhappy paths” during connection time was a challenge. However with careful planing and separation of errors into few categories based on the level of disruption, user actions were required for only 20% of connection errors compared to the initial state, significantly improving the user experience.

Users had particular problem with aligning the NFC chip on their phone with the one in the Belimo device so I used the shape of the device as a top bar in order to give them a visual hint how to position the phone. Also, research has shown that in most cases users are not able see the screen while holding phone next to device so we used different haptic feedback patterns to notify them about any changes in the app. 

## What’s the outcome?
Our team managed to successfully deliver the project on schedule successfully merging functionalities of three apps into one and introducing new connection methods. This timely delivery was a significant achievement for us. 

### What did I learn?
- Transitioning a design system to a new platform requires strategic planning but can significantly enhance efficiency and scalability.
- Real-world testing is invaluable for identifying design improvements in complex working environments.
- Environment in which the application is used can have dramatic impact on the overall usability

## Full Application Prototype
Click to start and interact. Please note that not all buttons are functional. Observe cursor changes to identify interactive elements, as the embedded prototype does not display tap targets.

## Batch Workflows Prototype

