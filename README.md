## Run

1. Install Docker
2. Also Create a `.env` file in the root directory to run locally with ```npm run start```:
    ```env
    PORT=3000
    ACCESS_SECRET=jioah8923roielfeioaeoeiojf
    REFRESH_SECRET=lkangsdjngsdkl12i2orf0wnef
    DB_URI=mysql://root:root@localhost:3306/sfs
    ```
3. Or just run:
    ```sh
    docker-compose up -d
    ```
4. Go to `http://localhost:3000`
