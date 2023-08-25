const express = require('express')
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/record", records);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});