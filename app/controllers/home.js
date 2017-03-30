
import User from '../models/users/index';

const index = async (ctx, next) => {
  ctx.redirect('/dashboard');
};

const handle404 = async (ctx, next) => {
  await ctx.render('error/404', {
    title: ctx.__("errorPage.title"),
    text: ctx.__("errorPage.text"),
    redirectText: ctx.__("errorPage.redirectText")
  });
};

const dashboard = async (ctx, next) => {
  const { githubLogin } = ctx.session;
  if (ctx.state.isMobile) {
    ctx.redirect(`/github/${githubLogin}/mobile`);
  }

  await ctx.render('user/dashboard', {
    title: ctx.__("dashboard.title", githubLogin),
    about: ctx.__("dashboard.about"),
    feedback: ctx.__("dashboard.feedback"),
    code: ctx.__("dashboard.code"),
  });
};

const initial = async (ctx, next) => {
  const { githubLogin } = ctx.session;
  await ctx.render('user/initial', {
    title: `Initial ${githubLogin}`
  });
};

export default {
  index,
  handle404,
  dashboard,
  initial
}
