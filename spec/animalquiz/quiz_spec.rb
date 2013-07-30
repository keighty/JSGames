require 'spec_helper'

module AnimalQuiz
  describe Quiz do
    subject { @quiz }
    before { @quiz = AnimalQuiz::Quiz.new }

    describe 'intro' do
      it "asks user to think of an animal" do
        visit '/animalquiz'
        puts page
        puts page.content
        page.should have_content "Think of an animal"
      end
    end

  end
end
