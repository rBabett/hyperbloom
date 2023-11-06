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

Hyper Bloom is a web application that aims to help newbies, hobbyists and professional gardeners alike in visualizing their plants' needs and keep track of watering and fertilization dates. Using built-in types for light, water and soil needs, Hyper Bloom urges its users to learn more about their plants, to which the users can also add the plants' preferred temperature range in their preferred unit. It is also possible to keep track of a plant's growth or harvest.<br>
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

1. First, you will need Node.js and Node Package Manager to run the application.
You can install Node.js from the site *https://nodejs.org/en/download/* (the installer includes NPM).
If you already have Node.js but not NPM, you can install NPM from the terminal:
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
2. Install NPM packages, restore dependencies and update the database
   ```sh
   npm install
   dotnet restore
   dotnet ef migrations add InitialMigration
   dotnet ef database update
   ```
After this, you will be ready to run the application!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

Hyper Bloom is still in early stages and under constant development. <br>

With the help of a colorful table, you can easily keep track of your plants' needs, harvest amount, and watering and fertilization dates.
<details>
<img src="https://github.com/rBabett/hyperbloom/assets/113454591/bceb72c2-6fa4-49b5-953b-c3ceb62d658c">
</details>

You can add various seeds to your collection, which you can plant in your gardens!
<details>
<img src="https://github.com/rBabett/hyperbloom/assets/113454591/a69e3d93-b5db-416b-8975-f92c093fe1f1">
</details>

In the list of your gardens, you can see a simplified version of each of your gardens. Each colorful initial represents the seed planted in the specific cell.
<details>
<img src="https://github.com/rBabett/hyperbloom/assets/113454591/cab1b8a6-8160-43ac-9727-c8c98a16cd1b">
</details>

In the detailed view of the garden, you can plant seeds and see the full name of everything you've planted. This is also where you can water and fertilze each cell of a garden.
<details>
<img src="https://github.com/rBabett/hyperbloom/assets/113454591/fba1220e-83dd-48e4-a5f0-28587270c66a">
</details>



<img src="https://github.com/rBabett/hyperbloom/assets/113454591/d0164a49-36f2-4c45-8ed7-ad62696df50d" width="120" height="120"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [X] CRUD operations with plants
- [X] Watering/fertilizing operations
- [X] Sizeable garden grid
  - [X] Plantable seeds
  - [X] Watering/fertilizing plants straight from the garden
- [X] Estimated vs actual harvest visualization
  - [X] Harvest visualization in plants table
  - [ ] Harvest visualization in seeds table
- [ ] Add more info to seeds
- [ ] Nicer CSS
  - [ ] Hand-drawn icons

<p align="right">(<a href="#readme-top">back to top</a>)</p>


