import QuestionService from '../services/QuestionService';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['RETURN_LIKES', 'RETURN_DISLIKES']),
  },
  methods: {
    ...mapMutations(['SET_LIKES', 'SET_DISLIKES']),
    getLike() {
      if (
        this.RETURN_LIKES.length > 0 &&
        this.RETURN_LIKES.includes(this.question._id.toString())
      ) {
        this.isLike = true;
      } else {
        this.isLike = false;
      }
    },
    getDislike() {
      if (
        this.RETURN_DISLIKES.length > 0 &&
        this.RETURN_DISLIKES.includes(this.question._id.toString())
      ) {
        this.isDislike = true;
      } else {
        this.isDislike = false;
      }
    },

    async changeLike() {
      this.isLike = !this.isLike;
      this.SET_LIKES({ isLike: this.isLike, id: this.question._id });

      let valDislike = this.question.dislikes;
      if (this.isDislike) {
        this.isDislike = !this.isDislike;
        this.SET_DISLIKES({
          isDislike: this.isDislike,
          id: this.question._id,
        });
        valDislike = --this.question.dislikes;
      }

      this.question = {
        ...this.question,
        likes: this.isLike ? ++this.question.likes : --this.question.likes,
        dislikes: valDislike,
      };

      let formData = {
        _id: this.question._id,
        likes: this.question.likes,
        dislikes: this.question.dislikes,
      };

      await QuestionService.changeLike(formData).then(() => {
        // if (this.isDislike && val) {
        //   this.changeDislike(true);
        // }
      });
    },

    async changeDislike() {
      this.isDislike = !this.isDislike;
      this.SET_DISLIKES({
        isDislike: this.isDislike,
        id: this.question._id,
      });

      let valLike = this.question.likes;
      if (this.isLike) {
        this.isLike = !this.isLike;
        this.SET_LIKES({ isLike: this.isLike, id: this.question._id });
        valLike = --this.question.likes;
      }

      this.question = {
        ...this.question,
        likes: valLike,
        dislikes: this.isDislike
          ? ++this.question.dislikes
          : --this.question.dislikes,
      };

      let formData = {
        _id: this.question._id,
        likes: this.question.likes,
        dislikes: this.question.dislikes,
      };

      await QuestionService.changeDislike(formData).then(() => {
        // if (this.isLike && val) {
        //   this.changeLike(true);
        // }
      });
    },
  },
};
