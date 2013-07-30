require 'spec_helper'

module AnimalQuiz
  describe Quiz do
    subject { @quiz }
    before do
      @quiz = AnimalQuiz::Quiz.new
      @output = @quiz.start
    end

  it { should respond_to(:no) }
  it { should respond_to(:yes) }

    describe 'intro' do
      it "asks user to think of an animal" do
        visit '/animalquiz'
        page.should have_content "Start by thinking of an animal"
        page.should have_button "Ready?"
      end
      it "asks 'Is it an elephant?'" do
        expect(@output).to eq("Is it an elephant?")
      end
    end

    describe 'wrong' do
      it "creates a new path from experience" do
        animal = "tiger"
        question = "Does it have fur?"
        answer = "yes"
        expect(@quiz.wrong(animal, question, answer)).to eq("Play again?")
      end
      it "follows a path through two nodes" do
        @quiz.no
        @quiz.no
        @quiz.yes
      end
    end
  end
end
