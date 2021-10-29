const fs = require('fs');

class Blogs {
  constructor(filename = 'blogs.json') {
    this.path = `./data/${filename}`;

    try {
      fs.readdirSync('data');
    } catch (error) {
      fs.mkdirSync('data');
    }

    try {
      fs.accessSync(this.path);
    } catch (error) {
      fs.writeFileSync(this.path, '[]');
    }
  }

  createId() {
    return new Date().getTime().toString();
  }

  async create(data, id, imageName) {
    const totalData = JSON.parse(await fs.promises.readFile(this.path));
    const { content } = data;
    const desc = content.substr(0, 100) + '...';
    totalData.push({
      ...data,
      id,
      desc,
      thumbnail: `http://192.168.1.89:3500/${imageName}`,
    });

    await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
  }

  async getAll() {
    const data = JSON.parse(await fs.promises.readFile(this.path));
    return data.filter(blogs => delete blogs.content);
  }

  async searchPosts(query) {
    try {
      const data = await this.getAll();
      return data.filter(blogs =>
        blogs.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.log('Error while searching post.');
    }
  }


  async getSingle(id) {
    const data = await JSON.parse(await fs.promises.readFile(this.path));
    return data.find(blogs => blogs.id === id);
  }

  async getByCategory(category) {
    const data = await this.getAll();
    return data.filter(blogs => blogs.category === category);
  }
}

module.exports = Blogs;