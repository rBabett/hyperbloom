<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://github.com/rBabett/hyperbloom/assets/113454591/f8772975-0f12-47fb-9525-d69b0f54886d" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">Hyper Bloom</h3>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



## About The Project

Hyper Bloom is a web application that aims to help newbies, hobbyists and professional gardeners both in visualizing their plants' needs and keep track of watering and fertilization dates. Using built-in types for light, water and soil needs, Hyper Bloom urges its users to learn more about their plants. <br>
For future features, see the <a href="#roadmap">roadmap</a>!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

For the frontend:
* ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

For the backend:
* ![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
* ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)

For the database:
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites

1. First, you will need Node Package Manager to run the application.
* npm
  ```sh
  npm install npm@latest -g
  ```

2. You will need to create the database "HyperBloom" in postgres. The connection should have the following:
<details>
  <summary>Connection</summary>
  <ul>
    <li>Host: localhost</li>
    <li>Port: 5432</li>
    <li>User: postgres</li>
    <li>Password: postgres</li>
    <li>Database: HyperBloom</li>
  </ul>
</details>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rBabett/hyperbloom.git
   ```
2. Install NPM packages and restore dependencies
   ```sh
   npm install
   dotnet restore
   ```
After this, you will be ready to run the application!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

Hyper Bloom is still in early stages and under constant development. <br>
This colorful table helps you visualize your plants' needs. In the future, this part will look much better - until then, it's an early sneak-peek of what you can expect.:) <br>

<details>
<img src="https://github.com/rBabett/hyperbloom/assets/113454591/8ef8c3fc-5445-4af0-afb2-2bfb13dcef6f">
</details>

<img src="https://github.com/rBabett/hyperbloom/assets/113454591/d0164a49-36f2-4c45-8ed7-ad62696df50d" width="120" height="120"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [X] CRUD operations with plants
- [X] Watering/fertilizing operations
- [ ] Sizeable garden grid
  - [ ] Plantable seeds
  - [ ] Watering/fertilizing plants straigth from the garden
- [ ] Estimated vs actual harvest visualization
  - [ ] Harvest visualization in plants table
  - [ ] Harvest visualization in garden
- [ ] Nicer CSS
  - [ ] Hand-drawn icons

<p align="right">(<a href="#readme-top">back to top</a>)</p>


