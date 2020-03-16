const { prisma } = require("./prisma/generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    customers(_, __, ctx) {
      return ctx.prisma.customers();
    },
    customer(_, args, ctx) {
      return ctx.prisma.customer({ email: args.email });
    },
    feedbacks(_, __, ctx) {
      return ctx.prisma.feedbacks({
        orderBy: "createdAt_DESC"
      });
    }
  },
  Mutation: {
    async resetData(_, __, ctx) {
      const { count } = await ctx.prisma.deleteManyFeedbacks();
      return {
        success: true,
        count: count
      };
    },
    async createFeedback(_, { data: { comment, email, ...rest } }, ctx) {
      // check for existing customer first
      const customer = await ctx.prisma.customer({ email });
      return ctx.prisma.createFeedback({
        comment: comment,
        owner: customer
          ? {
              connect: {
                email
              }
            }
          : {
              create: {
                email,
                ...rest
              }
            }
      });
    }
  },
  Feedback: {
    owner(parent, __, ctx) {
      return ctx.prisma.feedback({ id: parent.id }).owner();
    }
  },
  Customer: {
    tickets(parent, __, ctx) {
      return ctx.prisma.customer({ id: parent.id }).tickets();
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
