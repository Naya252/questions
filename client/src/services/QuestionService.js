import axios from 'axios';

const url = '/api/questions/';

class QuestionService {
  //Get Questions
  static getQuestions() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((question) => ({
            ...question,
            createdAt: new Date(question.createdAt),
          })),
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  //Get Question by Id
  static getQuestionById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${id}`);
        const data = res.data;
        resolve(
          data.map((question) => ({
            ...question,
            createdAt: new Date(question.createdAt),
          })),
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  //Create Question
  static insertQuestion(data) {
    return axios.post(url, {
      data,
    });
  }

  //Change Like
  static changeLike(data) {
    return axios.put(`${url}like/${data._id}`, {
      likes: data.likes,
      dislikes: data.dislikes,
    });
  }

  //Change Dislike
  static changeDislike(data) {
    return axios.put(`${url}dislike/${data._id}`, {
      likes: data.likes,
      dislikes: data.dislikes,
    });
  }

  //Add view
  static addView(data) {
    return axios.put(`${url}view/${data._id}`, {
      views: data.views,
    });
  }

  //Delete Question
  static deleteQuestion(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default QuestionService;
