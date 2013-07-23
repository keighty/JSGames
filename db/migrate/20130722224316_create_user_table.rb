class CreateUserTable < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.string :name
      t.string :email
      t.timestamps
    end

    User.create(name: "Gordon Shumway", email: "gordon@example.com")
    User.create(name: "Fanny Eubanks", email: "fanny@example.com")
  end

  def down
    drop_table :users
  end
end
